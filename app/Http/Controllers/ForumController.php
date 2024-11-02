<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Http\Requests\StoreForumRequest;
use App\Http\Requests\UpdateForumRequest;
use App\Models\Cohort;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Cohort $cohort)
    {
        $forum = $cohort->forums()->with('replies.user', 'user')->get();

        return response()->json($forum);
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
        if($request->forum_id){
            $request->validate([
                'description' => 'required',
                'forum_id' => 'required',
                'cohort_id' => 'required',
                'attachments.*' => 'file|mimes:doc,docx,pdf,txt,zip,rar,jpeg,png,jpg|max:2048'
            ]);
        } else {
            $request->validate([
                'title' => 'required',
                'category' => 'required',
                'cohort_id' => 'required',
                'attachments.*' => 'file|mimes:doc,docx,pdf,txt,zip,rar,jpeg,png,jpg|max:2048'
            ]);
        }

        $forum = Forum::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'cohort_id' => $request->cohort_id,
            'parent_id' => $request->forum_id,
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
                $oldattachments = json_decode($forum->attachments);
                $oldattachments[] = [
                    'file_path' => $filePath,
                    'file_name' => $name,
                    'file_size' => $fileSize,
                    'file_type' => $fileType,
                ];


                // Save each file information to the database
                $forum->update([
                    'attachments' => json_encode($oldattachments)
                ]);
                // $fileRecord = File::create([
                //     'cohort_id' => $request->cohort_id,
                //     'user_id' => Auth::user()->id,
                //     'assignment_id' => $assignment->id,
                //     'title' => $request->title,
                //     'description' => $request->description,
                //     'file_path' => $filePath,
                //     'file_name' => $name,
                //     'file_size' => $fileSize,
                //     'file_type' => $fileType,
                //     // Add other columns as needed
                // ]);

                // $attachments[] = $fileRecord;
            }
        }

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Forum $forum)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Forum $forum)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateForumRequest $request, Forum $forum)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Forum $forum)
    {
        //
    }
}
