<?php

namespace App\Http\Controllers;

use App\Models\ApartmentAttribute;
use App\Http\Requests\StoreApartmentAttributeRequest;
use App\Http\Requests\UpdateApartmentAttributeRequest;

class ApartmentAttributeController extends Controller
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
    public function store(StoreApartmentAttributeRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $attribute = ApartmentAttribute::create([
           'name' => $request->name,
        ]);

        if(!$attribute) {
            return redirect()->back()->with('error', 'Failed to create attribute');
        }

        return redirect()->route('admin.apartments');

    }

    /**
     * Display the specified resource.
     */
    public function show(ApartmentAttribute $apartmentAttribute)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApartmentAttribute $apartmentAttribute)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApartmentAttributeRequest $request, ApartmentAttribute $apartmentAttribute)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $attribute = $apartmentAttribute->update([
           'name' => $request->name,
        ]);

        if(!$attribute) {
            return redirect()->back()->with('error', 'Failed to create attribute');
        }

        return redirect()->route('admin.apartments');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApartmentAttribute $apartmentAttribute)
    {
        //
    }
}
