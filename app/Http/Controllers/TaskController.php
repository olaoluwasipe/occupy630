<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cohorts = User::find(Auth::user()->id)->studentcohort;
        $current_time = Carbon::now();
        $tasks = $cohorts->flatMap(function ($cohort) use ($current_time) {
            // Filter assignments
            $filteredAssignments = $cohort->assignments()->with('cohort.course')->where('due_date', '>=', $current_time)->get();

            // Filter meetings
            $filteredMeetings = $cohort->meetings()->with('cohort.course')->where('date', '>=', $current_time)->get();

            // Combine and sort by date
            $combinedTasks = $filteredAssignments->concat($filteredMeetings)->sortBy(function ($task) {
                // Standardize date format
                $date = isset($task->due_date) ? Carbon::parse($task->due_date) : Carbon::parse($task->date);
                return $date;
            });

            return $combinedTasks->values();
        });

        // Convert the collection to an array
        $tasksArray = $tasks->toArray();
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasksArray
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
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
