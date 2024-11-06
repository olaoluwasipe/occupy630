<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Http\Requests\StoreApartmentRequest;
use App\Http\Requests\UpdateApartmentRequest;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
                    'path' => $path,
                    'name' => $name,
                    'type' => $file->getClientOriginalExtension(),
                    'size' => $file->getSize(),
                    'url' => $path,
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
    public function show(Apartment $apartment)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Apartment $apartment)
    {
        //
    }
}
