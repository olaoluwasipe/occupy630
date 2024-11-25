<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CompanyController extends Controller
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
        $user = Auth::user();
        return Inertia::render('Company/Register', [
            'company' => $user->company
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request)
    {
        // Retrieve user's company once and reuse
        $company = $request->user()->company;

        // Fill company with validated data
        $company->fill($request->validated());

        // Handle logo upload if provided
        if ($request->hasFile('logo')) {
            $company->logo = $this->uploadLogo($request->file('logo'));
        }

        // Save changes
        $company->save();

        return Redirect::route('home');
    }

    /**
     * Handle the logo upload and return the storage path.
     */
    protected function uploadLogo($file)
    {
        // Ensure the directory exists
        $directory = 'images/logo';
        if (!File::exists(public_path($directory))) {
            File::makeDirectory(public_path($directory), 0755, true);
        }

        // Generate a unique name for the file
        $name = time() . '_' . $file->getClientOriginalName();

        // Move the file to the public/images/logo directory
        $path = $file->move(public_path($directory), $name);

        return '/images/logo/' . $name; // Return the relative URL to the logo
    }

    public function registerStaff (Request  $request) {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);

        $companyUrl = $request->user()->company->url;
        $registerCode = Str::random(10);
        $user = User::create([
            'fname' => uniqid(),
            'lname' => uniqid(),
            'email' => $request->email,
            'password' => bcrypt($registerCode),
            'company_id' => $request->user()->company->id,
            'register_code' => $registerCode,
            'type' => 'employee',
        ]);

        $user->assignRole('employee');

        return redirect()->back()->with('success', 'Request sent successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
