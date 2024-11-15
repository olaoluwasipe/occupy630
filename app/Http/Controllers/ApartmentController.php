<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Http\Requests\StoreApartmentRequest;
use App\Http\Requests\UpdateApartmentRequest;
use App\Models\ApartmentAttribute;
use App\Models\Approval;
use App\Models\Chat;
use App\Models\HousePayment;
use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $company = Auth::user()->company;
        // $employees = User::where('type', 'employee')->where('company_id', $company->id)->pluck('id');
        $apartments = Apartment::whereNull('tenant_id')->with('landlord','images', 'category')->get();
        // $newApartments = Apartment::whereIn('tenant_id', $employees)->with('tenant','images', 'category')->get();
        return inertia('Apartments/Index', [
            'apartments' => $apartments,
            // 'newApartments' => $newApartments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApartmentRequest $request)
    {
        // Retrieve validated data and add location attributes
        $data = array_merge(
            $request->validated(),
            [
                'state' => $request->location['state'] ?? null,
                'city' => $request->location['lga'] ?? null,
                'country' => 'Nigeria',
                'status' => 'pending',
                'category_id' => $request->category,
                'cg_price' => $request->price + ($request->price * 0.3),
                'monthly_price' => ($request->price + ($request->price * 0.3)) / 12,
            ]
        );

        // Create the apartment instance
        $apartment = $request->user()->ownedApartments()->create($data);

        // Handle attachments if they exist
        if ($request->hasFile('attachments')) {
            $files = $request->file('attachments');
            // dd($files);
            $attachments = [];

            foreach ($files as $file) {
                $path = $this->uploadImg($file);
                $name = basename($path); // Get the filename

                // Push each attachment's data to the array
                $attachments[] = [
                    'path' => '/storage/'.$path,
                    'name' => $name,
                    'type' => $file->getClientOriginalExtension(),
                    'size' => $file->getSize(),
                    'url' => env('APP_URL').'/storage/'.$path,
                    'main' => false,
                ];
            }

            // Save all attachments to the apartment's images relationship
            $apartment->images()->createMany($attachments);
        }

        return redirect()->route('admin.apartments');
    }

    public function uploadImage($file)
    {
        // Ensure the directory exists
        $directory = 'images/property_images';
        if (!File::exists(public_path($directory))) {
            File::makeDirectory(public_path($directory), 0755, true);
        }

        // Generate a unique name for the file
        $name = time() . '_' . $file->getClientOriginalName();

        // Move the file to the specified directory
        $path = $file->move(public_path($directory), $name);

        return '/images/property_images/' . $name; // Return the relative URL to the image
    }
    public function uploadImg($file) {
        $path = $file->store('attachments', 'public');
        return $path;
    }


    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $apartment = Apartment::where('slug', $slug)->with('landlord', 'category', 'images')->first();
        $apartment->approval = Approval::where('apartment_id', $apartment->id)->where('user_id', Auth::id())->latest()->first();
        return Inertia::render('Apartments/Single', [
            'apartment' => $apartment,
        ]);
    }

    public function requestApproval(Apartment $apartment) {
        $approval = Approval::create([
            'apartment_id' => $apartment->id,
            'user_id' => Auth::id(),
            'approver_id' => Auth::user()->employedCompany->user_id,
            'status' => Approval::getStatusTextAttribute('pending'),
        ]);
    }

    public function saveInquiry(Request $request) {
        $request->validate([
            'inquiry_type' => 'required|string|in:inquiry,schedule_inspection',
            'schedule_date' => 'required_if:inquiry_type,schedule_inspection|date',
            'message' => 'required_if:inquiry_type,inquiry|string',
            'apartment_id' => 'required|exists:apartments,id',
        ]);
        $type = $request->input('inquiry_type');
        $date = $request->input('schedule_date');
        $message = $request->input('message');

        $inquiry = Inquiry::create([
            'type' => $type,
            'schedule_date' => $date,
            'message' => $message,
            'apartment_id' => $request->apartment_id
        ]);

        $apartment = Apartment::find($request->apartment_id);

        $landlord = $apartment->landlord;

        $user = Auth::user();
        $message .= "\n\nAbout this <a style='color:red' href='".route('apartment.show', $apartment->slug)."'>apartment</a>.";
        // $employer = $user->employedCompany->user_id;
        Chat::create([
            'sender_id' => $user->id,
            'receiver_id' => $landlord->id,
            'message' => $message,
        ]);
        // if(!$inquiry) return redirect()->back()->withErrors();
        // $inquiry->apartment()->associate($request->apartment_id);
         return redirect()->back()->with('success', 'Message sent successfully');

    }

    public function requestRentPay (Apartment $apartment) {
        $user = Auth::user();
        $message = "I have made the initial payment for the <a style='color:red' href='/apartment/".$apartment->slug."'>apartment</a>. Please make the first month payment of NGN ".number_format($apartment->monthly_price, 2).". Please let me know when the apartment is ready for occupancy. Thank you.";
        $employer = $user->employedCompany->user_id;
        Chat::create([
            'sender_id' => $user->id,
            'receiver_id' => $employer,
            'message' => $message,
        ]);
        return redirect()->back()->with('success', 'Message sent successfully');
    }

    public function makeInitialPayment (Request $request) {
        $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'amount' => 'required|numeric|min:1',
            'method' => 'required|string|in:card,bank_transfer,paystack',
            'reference' => 'required_if:payment_method,bank_transfer|string',
        ]);
        HousePayment::create([
            'apartment_id' => $request->apartment_id,
            'user_id' => Auth::user()->id,
            'amount' => $request->amount,
            'due_date' => now()->addDays(7),
            'date' => now(),
            'status' => 'success',
            'note' => 'Initial Payment made by Employee',
            'mode' => 'initial',
            'type' => 'one-time',
            'method' => $request->method,
            'reference' => $request->reference,
        ]);

        $apartment = Apartment::find($request->apartment_id);
        $apartment->status = 'booked';
        $apartment->tenant_id = Auth::user()->id;
        $apartment->save();

        return redirect()->route('home')->with('success', 'Payment made successfully');
    }

    public function makePayment (Request $request) {
        dd($request);
        $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string|in:card,bank_transfer,paystack',
            'payment_reference' => 'required_if:payment_method,bank_transfer|string',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Apartment $apartment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApartmentRequest $request, Apartment $apartment)
    {
        $data = array_merge(
            $request->validated(),
            [
                'state' => $request->location['state'] ?? null,
                'city' => $request->location['lga'] ?? null,
                'country' => 'Nigeria',
                'status' => 'pending',
                'category_id' => $request->category,
                'cg_price' => $request->price + ($request->price * 0.3),
                'monthly_price' => ($request->price + ($request->price * 0.3)) / 12,
            ]
        );

                // Handle image uploads if present
                if ($request->has('images')) {
                    // Get existing image IDs from the request
                    $existingImageIds = collect($request->input('images'))
                        ->filter(fn($image) => is_array($image) && isset($image['id']))
                        ->pluck('id')
                        ->toArray();

                    // Delete images that are no longer present
                    $apartment->images()
                        ->whereNotIn('id', $existingImageIds)
                        ->delete();

                    // Handle new image uploads
                    $newImages = collect($request->file('images'))
                        ->filter(fn($image) => is_object($image) && $image instanceof \Illuminate\Http\UploadedFile);

                    foreach ($newImages as $image) {
                        $path = $this->uploadImg($image);
                        $name = basename($path); // Get the filename
                        $apartment->images()->create([
                            'path' => '/storage/'.$path,
                            'name' => $name,
                            'type' => $image->getClientOriginalExtension(),
                            'size' => $image->getSize(),
                            'url' => env('APP_URL').'/storage/'.$path,
                            'main' => false,
                        ]);
                    }
                }
                // Update apartment details
                $apartment->update($data);
                dd($data);

                return redirect()->route('admin.apartments')->with('success', 'Apartment updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Apartment $apartment)
    {
        //
    }
}
