<?php

namespace App\Http\Controllers;

use App\Models\AssignmentSubmission;
use App\Http\Requests\StoreAssignmentSubmissionRequest;
use App\Http\Requests\UpdateAssignmentSubmissionRequest;
use App\Models\Assignment;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssignmentSubmissionController extends Controller
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
            'text' =>'required',
            'assignment_id' => 'required',
        ]);

        $submission = AssignmentSubmission::create([
            'text' => $request->text,
            'assignment_id' => $request->assignment_id,
            'user_id' => Auth::user()->id
        ]);

        $assignment = Assignment::find($request->assignment_id);

        if($request->hasFile('file')) {
            $request->validate([
                'file.*' =>'file|mimes:jpeg,png,pdf,docx,zip,rar|max:2048'
            ]);
            $name = time().'_'. $request->file[0]->getClientOriginalName();
            $filePath = $request->file[0]->storeAs('uploads', $name, 'public');
            // $attachments[] = $filePath;
            $fileSize = $request->file[0]->getSize(); // Get the file size
            $fileType = $request->file[0]->getMimeType(); // Get the file type

            // Save each file information to the database
            $fileRecord = File::create([
                'cohort_id' => $assignment->cohort_id,
                'user_id' => Auth::user()->id,
                'assignment_id' => $request->assignment_id,
                'title' => $assignment->title,
                'description' => $assignment->description,
                'file_path' => $filePath,
                'file_name' => $name,
                'file_size' => $fileSize,
                'file_type' => $fileType,
                // Add other columns as needed
            ]);

            $submission->update([
                'file_id' => $fileRecord->id
            ]);

            // $submission->file()->attach($fileRecord);

            // $attachments[] = $fileRecord;
        }

        $submission->notifyStudents();

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function feedback(Request $request)
    {
        $request->validate([
            'text' =>'required',
            'assignment_id' => 'required',
        ]);

        $assignment = AssignmentSubmission::find($request->assignment_id);
        $assignment->student_feedback = $request->text;
        $assignment->save();

        return redirect()->back();

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AssignmentSubmission $assignmentSubmission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AssignmentSubmission $assignmentSubmission)
    {
        $request->validate([
            'grade' => 'required'
        ]);
        // if($assignmentSubmission->grade)
        $assignmentSubmission->update($request->all());
        return redirect('/assignments/'.$assignmentSubmission->assignment_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AssignmentSubmission $assignmentSubmission)
    {
        //
    }
}
