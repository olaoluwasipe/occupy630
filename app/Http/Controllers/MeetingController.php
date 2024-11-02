<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Http\Requests\StoreMeetingRequest;
use App\Http\Requests\UpdateMeetingRequest;
use App\Models\Attendance;
use App\Models\Cohort;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MeetingController extends Controller
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
            'cohort_id' => 'required',
            'link' =>'required',
            'date' =>'required',
            'from' =>'required',
            'to' =>'required',
        ]);

        $date = date('d F, Y', strtotime($request->date));
        $time = date('h:i A', strtotime($request->from)).' to '. date('h:i A', strtotime($request->to));

        $meeting = Meeting::create([
            'cohort_id' => $request->cohort_id,
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'description' => $request->description ? $request->description : 'Click link to join meeting',
            'link' => $request->link,
            'date' => $date,
            'duration_time' => $time,
        ]);

        $meeting->notifyStudents();
        
        $meeting->addActivity(Auth::user()->id, $request->cohort_id);

        return redirect()->back();
    }

    public function takeAttendance (Request $request) {
        $request->validate([
            'attendance.*' => 'required'
        ]);

        foreach($request->attendance as $attended) {
            $attend = Attendance::where('user_id', $attended['user_id'])->where('meeting_id', $attended['meeting_id'])->get();
            if(count($attend) > 0) {
                $attend = Attendance::where('user_id', $attended['user_id'])->where('meeting_id', $attended['meeting_id']);
                $attend->update([
                    'user_id'=> $attended['user_id'],
                    'meeting_id' => $attended['meeting_id'],
                    'status' => $attended['status']
                ]);
            } else {
                $attendance = Attendance::create([
                    'user_id'=> $attended['user_id'],
                    'meeting_id' => $attended['meeting_id'],
                    'status' => $attended['status']
                ]);
            }
            }

        return redirect()->back();
        // return response()->json($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meeting $meeting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMeetingRequest $request, Meeting $meeting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meeting $meeting)
    {
        //
    }
}
