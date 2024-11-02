<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Cohort;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $studentEnrolled = User::find(Auth::user()->id)->studentcohort()->pluck('cohort_student.cohort_id');
        $cohortcourses = Cohort::whereIn('id', $studentEnrolled)->pluck('course_id');
        $newcourses = Course::whereNotIn('id', $cohortcourses)->get();
        if(Auth::user()->type == 'tutor') {
            $courses = User::find(Auth::user()->id)->tutorcohort()->with('course', 'tutor', 'students', 'assignments', 'meetings')->get();
            $courses = $courses->map(function ($cohort) {
                $upcomingAssignments = $cohort->assignments->filter(function ($assignment) {
                    return $assignment->due_date > now();
                })->count();

                $cohort->upcoming_assignments = $upcomingAssignments > 0
                    ? $upcomingAssignments . ' upcoming ' . Str::of('assignment')->plural()
                    : 'No upcoming assignments';

                return $cohort;
            });

        }else {
            $courses = User::find(Auth::user()->id)->studentcohort()->with('course', 'tutor', 'students', 'assignments', 'meetings')->get();
        }
        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'newcourses' => $newcourses
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
    public function store(StoreCourseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $course = Course::where('slug', $slug)->with('cohorts.assignments', 'modules', 'cohorts.activities.subject', 'cohorts.students')->first();
        $course->cohorts->tutor = $course->cohorts->map(function ($cohort) {
            $cohort->tutor = $cohort->tutor()->first();
            return $cohort;
        });
        $course->cohorts->assignments = $course->cohorts->map(function ($cohort) {
            $cohort->assignments = $cohort->assignments()->get();
            foreach ($cohort->assignments as $assignment) {
                $assignment->status = $assignment->status;
            }
            return $cohort;
        });
        $course->cohorts->forums = $course->cohorts->map(function ($cohort) {
            $cohort->forums = $cohort->forums()->with('replies.user', 'user')->get();
            return $cohort;
        });
        $course->cohorts->files = $course->cohorts->map(function ($cohort) {
            $cohort->files = $cohort->files()->with('user')->get();
            return $cohort;
        });
        $course->cohorts->meetings = $course->cohorts->map(function ($cohort) {
            $cohort->meetings = $cohort->meetings()->with('attendance.user')->get();
            return $cohort;
        });
        return Inertia::render('Courses/Single', [
            'course' => $course,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
