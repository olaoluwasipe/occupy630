<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Http\Requests\StoreFileRequest;
use App\Http\Requests\UpdateFileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller
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
    public function store(Request $request)
    {
        $request->validate([
            'title' =>'required',
            'description' =>'required',
            'attachments.*' =>'required|file|mimes:doc,docx,pdf,txt,zip,rar,jpeg,png,jpg|max:2048',
            'apartment_id' =>'required|exists:apartments,id',
        ]);

        $attachments = [];

        if($request->hasfile('attachments'))
        {
            $request->validate([
                'attachments.*' =>'file|mimes:doc,docx,pdf,txt,zip,rar,jpeg,png,jpg|max:2048'
            ]);
            foreach($request->file('attachments') as $file)
            {
                $name = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('uploads', $name, 'public');
                $attachments[] = $filePath;
                $fileSize = $file->getSize(); // Get the file size
                $fileType = $file->getMimeType(); // Get the file type

                // Save each file information to the database
                $fileRecord = File::create([
                    'apartment_id' => $request->apartment_id,
                    'user_id' => Auth::user()->id,
                    'tenant_id' => $request->tenant_id,
                    'title' => $request->title,
                    'description' => $request->description,
                    'file_path' => $filePath,
                    'file_name' => $name,
                    'file_size' => $fileSize,
                    'file_type' => $fileType,
                    // Add other columns as needed
                ]);

                $attachments[] = $fileRecord;
            }
        }

        return redirect()->back()->with('success', 'File uploaded successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFileRequest $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }
}
