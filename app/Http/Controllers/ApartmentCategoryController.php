<?php

namespace App\Http\Controllers;

use App\Models\ApartmentCategory;
use App\Http\Requests\StoreApartmentCategoryRequest;
use App\Http\Requests\UpdateApartmentCategoryRequest;

class ApartmentCategoryController extends Controller
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
    public function store(StoreApartmentCategoryRequest $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);
        $category = ApartmentCategory::create([
           'name' => $request->name,
           'description' => $request->description,
        ]);
        if(!$category) {
            return redirect()->back()->with('error', 'Failed to create category');
        }
        return redirect()->route('admin.apartments');
    }

    /**
     * Display the specified resource.
     */
    public function show(ApartmentCategory $apartmentCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApartmentCategory $apartmentCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApartmentCategoryRequest $request, ApartmentCategory $apartmentCategory)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        $category = ApartmentCategory::where('id', $apartmentCategory->id)->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        if(!$category) {
            return redirect()->back()->with('error', 'Failed to update category');
        }
        return redirect()->route('admin.apartments');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApartmentCategory $apartmentCategory)
    {
        //
    }
}
