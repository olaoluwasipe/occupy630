<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assignments = User::find(Auth::user()->id)->assignments()->with('cohort', 'tutor', 'submissions')->get();

        return Inertia::render('Assignments/Index', [
            'assignments' => $assignments,
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
    public function store(Request $request)
    {
        $request->validate([
            'title' =>'required',
            'description' =>'required',
            'dueDate' =>'required',
            'cohort_id' =>'required',
        ]);

        $assignment = Assignment::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->dueDate,
            'cohort_id' => $request->cohort_id,
            'user_id' => Auth::user()->id,
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
                    'cohort_id' => $request->cohort_id,
                    'user_id' => Auth::user()->id,
                    'assignment_id' => $assignment->id,
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

        $assignment->notifyStudents();
        $assignment->addActivity(Auth::user()->id);

        return redirect()->back();
        // return response()->json($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Assignment $assignment)
    {
        // Fetch the assignment along with its relationships
        $assignment = Assignment::with(
            'cohort.course',
            'tutor',
            'submissions.user', 
            'submissions.file', 
            'files.user', )->find($assignment->id);

        // Update the file paths if necessary
        foreach ($assignment->files as $file) {
            $file->file_path = asset('storage/' . $file->file_path);
        }

        $assignment->submittedUsers = $assignment->submittedUsers();
        $assignment->nonSubmittedUsers = $assignment->nonSubmittedUsers();

        // Render the view with the assignment data
        return Inertia::render('Assignments/Single', [
            'assignment' => $assignment,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Assignment $assignment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assignment $assignment)
    {
        //
    }
}
