<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Http\Requests\StoreApartmentRequest;
use App\Http\Requests\UpdateApartmentRequest;
use App\Mail\MailNotification;
use App\Models\ApartmentAttribute;
use App\Models\Approval;
use App\Models\Chat;
use App\Models\HousePayment;
use App\Models\Inquiry;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
// use Barryvdh\DomPDF\Facade as PDF;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $company = Auth::user()->company;
        // $employees = User::where('type', 'employee')->where('company_id', $company->id)->pluck('id');
        $apartments = Apartment::whereNull('tenant_id')
                        ->where('status',  'approved')
                        ->with('landlord','images', 'category')->get();
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

    public function showPayment (HousePayment $payment) {
        $payment = $payment->load('apartment.landlord');
        return inertia('Apartments/Payment', [
            'payment' => $payment,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApartmentRequest $request)
    {
        $data = array_merge(
            $request->validated(),
            [
                'state' => $request->location['state'] ?? null,
                'city' => $request->location['lga'] ?? null,
                'country' => 'Nigeria',
                'status' => 'pending',
                'category_id' => $request->category,
                'monthly_rent' => $request->price / 12,
                'cg_price' => $request->price + ($request->price * 0.3),
                'monthly_price' => ($request->price + ($request->price * 0.3)) / 12,
                'six_months_rent' => ($request->price + ($request->price * 0.3)) / 2,
            ]
        );

        $apartment = $request->user()->ownedApartments()->create($data);

        // Handle attachments
        if ($request->hasFile('attachments')) {
            $files = $request->file('attachments');
            $attachments = [];

            foreach ($files as $file) {
                // Prepare file details before moving
                $extension = $file->getClientOriginalExtension();
                $size = $file->getSize();
                $originalName = $file->getClientOriginalName();

                // Upload the file and get its relative path
                $path = $this->uploadImage($file);

                // Add file details to attachments
                $attachments[] = [
                    'path' => $path,
                    'name' => basename($path),
                    'type' => $extension,
                    'size' => $size,
                    'url' => env('APP_URL') . $path,
                    'main' => false,
                ];
            }

            // Save attachments to the apartment
            $apartment->images()->createMany($attachments);
        }

        return redirect()->back()->with('success', 'Apartment created successfully');
    }


    public function uploadImage($file)
    {
        $directory = 'images/property_images';

        if (!File::exists(public_path($directory))) {
            File::makeDirectory(public_path($directory), 0755, true, true); // Recursive creation
        }

        $name = time() . '_' . $file->getClientOriginalName();
        $path = $file->move(public_path($directory), $name);

        return str_replace(public_path(), '', $path); // Relative path
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
        $apartment = Apartment::where('slug', $slug)->with('landlord', 'category', 'images', 'tenant.employedCompany', 'transactions', 'files')->first();
        if(Auth::user()->type == 'employer') {
            $employees = Auth::user()->company->users()->orderBy('id','desc')->pluck('id')->toArray();
            $apartment->approval = Approval::where('apartment_id', $apartment->id)->where('status', 1)->whereIn('user_id', $employees)->with('payment')->latest()->first();

        } else {
            $apartment->approval = Approval::where('apartment_id', $apartment->id)->where('user_id', Auth::id())->with('payment')->latest()->first();
        }
        return Inertia::render('Apartments/Single', [
            'apartment' => $apartment,
        ]);
    }

    public function requestApproval(Apartment $apartment) {
        $living = Apartment::where('tenant_id', Auth::id())->where('status', 'rented')->first();
        if($living) {
            return redirect()->back()->with('error', 'You have an existing apartment, you cannot request for another one.');
        }
        $existingApproval = Approval::where('user_id', Auth::id())
                            ->where('created_at', '>=', now()->subDays(30))
                            ->where('status', '!=', Approval::getStatusAttribute('declined'))// Assuming you have a constant or replace with the exact value.
                            ->exists();
        // dd($existingApproval);
        if($existingApproval) {
            return redirect()->back()->with('error', 'You have already made a request in the last 30 days.');
        }
        $sameApartment = Approval::where('apartment_id', $apartment->id)
                                    ->where('user_id', Auth::id())
                                    ->where('status', '!=', Approval::getStatusAttribute('declined'))
                                    ->exists();
        if($sameApartment) {
            return redirect()->back()->with('error', 'You have already made a request for this apartment.');
        }
        $approval = Approval::create([
            'apartment_id' => $apartment->id,
            'user_id' => Auth::id(),
            'approver_id' => Auth::user()->employedCompany->user_id,
            'status' => Approval::getStatusTextAttribute('pending'),
        ]);

        $user = Auth::user();
        $header = "{$user->fname} is requesting approval for an apartment";
        $subject = "Request For Approval";
        $body = "An employee requested approval to rent this apartment.";
        $link = route('apartment.show', $apartment->slug);

        Mail::to(Auth::user()->employedCompany->owner->email)->send(new MailNotification($subject, $body, $link, $header));



        return redirect()->back()->with('success', 'Request sent successfully');
    }

    public function approveRequest (Request $request) {
        $request->validate([
            'action' => 'required|string|in:approve,decline',
            'approval_id' => 'required|exists:approvals,id',
            'agree' => 'nullable|boolean|required_unless:action,decline',
            'user_pay' => 'nullable|boolean|required_unless:action,decline',
            'comment' => 'nullable|string|required_unless:action,approve',
        ]);

        // dd($request->all());

        $approval = Approval::find($request->approval_id);
        if (!$approval) {
            return redirect()->back()->with('error', 'Approval not found.');
        }
        $approval->status = Approval::getStatusTextAttribute($request->action.'d');
        $approval->comment = $request->comment;
        $approval->save();

        $apartment = Apartment::find($approval->apartment_id);

        $prices = [
            'security_deposit' => $apartment->six_months_rent * 0.3,
            'agreement' => $apartment->six_months_rent * 0.10,
            'agency_fee' => $apartment->six_months_rent * 0.10,
        ];

        $total = $prices['security_deposit'] + $prices['agreement'] + $prices['agency_fee'];
        $reference = 'REF-'.Str::random(10);

        if($request->action === 'approve') {
            $housePay = HousePayment::create([
                'apartment_id' => $apartment->id,
                'user_id' => $approval->user_id,
                'approval_id' => $approval->id,
                'amount' => $total,
                'due_date' => now()->addDays(7),
                'date' => now(),
                'method' => 'none',
                'status' => 'pending',
                'reference' => $reference,
                'note' => 'Initial payment for the apartment',
                'meta' => [
                    'can_pay' => [
                        Auth::id(), $request->user_pay ? $approval->user_id : null,
                    ],
                    'prices' => $prices,
                ],
                'type' => 'initial',
                'mode' => 'one-time',
            ]);

            // dd($housePay);

            $pdf = $this->getPdfInHousePayment($housePay);


            $user = Auth::user();
            $header = "Congrats! Your approval has been granted by your employer";
            $subject = "Approval Status";
            $body = "Your apartment approval has been granted. Attached are the initial payments to be made.";
            $link = route('apartment.show', $apartment->slug);

            Mail::to($approval->user->email)->send(new MailNotification($subject, $body, $link, $header, $pdf, $housePay->reference));

            // $this->sendPaymentNotification($apartment, 'initial', $total, $pdf, $housePay->reference);
        }

        return redirect()->back()->with('success', 'Approval request '.$request->action.'d successfully.');
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
        $this->handlePayment($request, 'initial');
    }

    public function makeRentPayment (Request $request) {
        $this->handlePayment($request, 'rent');
    }

    public function handlePayment(Request $request, $type = 'initial') {
        $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'amount' => 'required|numeric|min:1',
            'method' => 'required|string|in:card,bank_transfer,paystack',
            'reference' => 'required_if:method,bank_transfer|string',
        ]);

        // Check for existing payment
        $existingHousePayment = HousePayment::where('reference', $request->reference)->first();

        if ($existingHousePayment) {
            $existingHousePayment->update([
                'status' => 'completed',
                'payment_method' => $request->method,
                'date' => now(),
            ]);
        } else {
            $existingHousePayment = HousePayment::create([
                'apartment_id' => $request->apartment_id,
                'user_id' => Auth::id(),
                'amount' => $request->amount,
                'due_date' => now()->addDays(7),
                'date' => now(),
                'status' => 'completed',
                'note' => ucfirst($type) . ' payment made by user',
                'mode' => $type === 'initial' ? 'initial' : 'monthly',
                'type' => $type === 'initial' ? 'one-time' : 'rent',
                'method' => $request->method,
                'reference' => $request->reference,
            ]);
        }

        // Update apartment status
        $apartment = Apartment::find($request->apartment_id);
        $apartment->status = $type === 'initial' ? 'booked' : 'rented';
        $apartment->availability = $type === 'initial' ? null : 'unavailable';
        $apartment->tenant_id = $existingHousePayment->user_id ?? Auth::id();
        $apartment->save();

        // Set next payment schedule
        $nextDueDate = $this->getNextDueDate($apartment->id, $apartment->monthly_price + $apartment->service_charge);

        $housePay = HousePayment::create([
            'apartment_id' => $apartment->id,
            'user_id' => Auth::id(),
            'amount' => $apartment->monthly_price + $apartment->service_charge,
            'due_date' => $nextDueDate,
            'date' => now(),
            'method' => 'none',
            'status' => 'pending',
            'reference' => 'REF-' . Str::random(10),
            'note' => 'Rent payment for the apartment',
            'meta' => [
                'can_pay' => [Auth::id()],
                'prices' => [
                    'monthly_rent' => $apartment->monthly_price,
                    'service_charge' => $apartment->service_charge,
                ],
            ],
            'type' => 'rent',
            'mode' => 'monthly',
        ]);

        // dd($existingHousePayment);
        // Generate PDF invoice
        $pdf = $this->getPdfInHousePayment($existingHousePayment);

        // Send mail notification
        $this->sendPaymentNotification($apartment, $type, $request->amount, $pdf, $existingHousePayment->reference);

        return redirect()->route('home')->with('success', ucfirst($type) . ' payment made successfully');
    }


    private function getPdfInHousePayment(HousePayment $payment) {
        if (!$payment->relationLoaded('user')) {
            $payment->load('user');
        }
        $pdf = Pdf::loadView('invoices.pdf', ['invoice' => $payment]);

        return $pdf;
    }

    private function getNextDueDate($apartmentId, $totalAmount) {
        $payments = HousePayment::where('apartment_id', $apartmentId)
            ->where('status', 'completed')
            ->latest()
            ->get();

        return $payments->count() == 1
            ? now()->addDays(30)
            : Carbon::parse($payments->first()->due_date)->addDays(30);
    }

    private function sendPaymentNotification($apartment, $type, $amount, $pdf=null, $reference='') {
        $user = Auth::user();
        $header = "Payment Notification";
        $subject = ucfirst($type) . " Payment Successful";
        $body = "Dear {$user->fname}, your {$type} payment of {$amount} for the apartment {$apartment->title} was successful.";
        $link = route('home');

        Mail::to($user->email)->send(new MailNotification($subject, $body, $link, $header, $pdf, $reference));

        $apartment->notifications()->create([
            'user_id' => $user->id,
            'type' => 'message',
            'data' => [
                'message' => $body,
                // 'sender' => $sender->fullname,
                // 'link' => $link,
            ]
        ]);
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

    public function approve(Apartment $apartment)
    {
        // Define status transitions and email details
        $statusTransitions = [
            'pending' => [
                'new_status' => 'approved',
                'subject' => 'Your apartment has been approved',
                'header' => 'Apartment Approval Notification',
                'body' => 'Congratulations! Your apartment has been approved and is now listed on the platform.',
            ],
            'disapproved' => [
                'new_status' => 'approved',
                'subject' => 'Your apartment has been approved',
                'header' => 'Apartment Approval Notification',
                'body' => 'Congratulations! Your apartment has been approved and is now listed on the platform.',
            ],
            'approved' => [
                'new_status' => 'disapproved',
                'subject' => 'Your apartment has been disapproved',
                'header' => 'Apartment Disapproval Notification',
                'body' => 'We regret to inform you that your apartment listing has been disapproved. Please contact support for more details.',
            ],
        ];

        // Check if the current status is valid for a transition
        if (array_key_exists($apartment->status, $statusTransitions)) {
            $transition = $statusTransitions[$apartment->status];

            // Update the apartment status
            $apartment->status = $transition['new_status'];
            $apartment->save();

            // Send notification email
            Mail::to($apartment->landlord->email)->send(new MailNotification(
                $transition['subject'],
                $transition['body'],
                route('apartments'),
                $transition['header']
            ));

            return redirect()->back()->with('success', "Apartment {$transition['new_status']} successfully");
        }

        // Handle unexpected status
        return redirect()->back()->with('error', 'Apartment status failed to update');
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
                'city' => $request->location['city'] ?? null,
                'country' => 'Nigeria',
                // 'status' => 'pending',
                'category_id' => $request->category,
                'cg_price' => $request->price + ($request->price * 0.3),
                'monthly_price' => ($request->price + ($request->price * 0.3)) / 12,
                'six_months_rent' => ($request->price + ($request->price * 0.3)) / 2,
                'monthly_rent' => $request->price / 12,
            ]
        );
        // dd($request->all());

                // Handle image uploads if present
                if ($request->has('attachments')) {
                    // Get existing image IDs from the request
                    $existingImageIds = collect($request->input('attachments'))
                        ->filter(fn($image) => is_array($image) && isset($image['id']))
                        ->pluck('id')
                        ->toArray();

                    // Delete images that are no longer present
                    $apartment->images()
                        ->whereNotIn('id', $existingImageIds)
                        ->delete();

                    // Handle new image uploads
                    $newImages = collect($request->file('attachments'))
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
                // dd($data);

                return redirect()->route('admin.apartments')->with('success', 'Apartment updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Apartment $apartment)
    {
        if($apartment->has('tenant')) {
            return redirect()->back()->with('error', 'Apartment has a tenant. Please remove the tenant first');
        }
        $apartment->delete();
    }
}
