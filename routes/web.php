<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AssignmentSubmissionController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TutorController;
use App\Models\AssignmentSubmission;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if(Auth::user()->type === 'admin' || Auth::user()->type === 'superadmin') {
        return redirect('/admin');
    }
    $cohorts = User::find(Auth::user()->id)->studentcohort;
    $assignments = User::find(Auth::user()->id)->assignments;
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

    return Inertia::render('Dashboard', [
        'courses' => $cohorts,
        'assignments' => $assignments,
        'tasks' => $tasksArray,
        'docs' => session('docs'),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified'])->name('home');

Route::prefix('/admin')->middleware(['auth', 'checkadmin'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');
    // Users
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/user/view/{user}', [AdminController::class, 'viewUser'])->name('admin.view-user');
    Route::post('/create-user', [AdminController::class, 'createUser'])->name('admin.create-user');
    Route::post('/update-user/{user}', [AdminController::class, 'updateUser'])->name('admin.update-user');
    Route::delete('/delete-user/{user}', [AdminController::class, 'deleteUser'])->name('admin.delete-user');

    // Courses
    Route::group(['middleware' => ['can:manage courses']], function () {
        Route::get('/courses', [AdminController::class, 'courses'])->name('admin.courses');
        // Route::get('/course/view/{course}', [AdminController::class, 'viewCourse'])->name('admin.view-course');
        Route::post('/create-course', [AdminController::class, 'createCourse'])->name('admin.create-course');
        Route::post('/update-course/{course}', [AdminController::class, 'updateCourse'])->name('admin.update-course');
        Route::delete('/course/{course}', [AdminController::class, 'deleteCourse'])->name('admin.delete-course');
    });
});

Route::middleware(['auth', 'checksuperadmin'])->group(function () {
    // Sessions
    Route::get('/sessions', [AdminController::class, 'sessions'])->name('admin.sessions');
    Route::post('/create-session', [AdminController::class, 'createSession'])->name('admin.create-session');
    Route::post('/update-session/{session}', [AdminController::class, 'updateSession'])->name('admin.update-session');
    Route::delete('/session/{session}', [AdminController::class, 'deleteSession'])->name('admin.delete-session');

    // Communications
    Route::get('/communications', [AdminController::class, 'communications'])->name('admin.communications');

    // Settings
    Route::get('/settings', [AdminController::class,'settings'])->name('admin.settings');
});

Route::middleware(['auth', 'checkuser'])->group(function () {
    // Courses
    Route::get('/courses', [CourseController::class, 'index'])->name('courses');
    Route::get('/course/{slug}', [CourseController::class,'show'])->name('course.show');

    // Assignments
    Route::get('/assignments/{assignment}', [AssignmentController::class,'show'])->name('assignment.show');
    Route::post('/assignment', [AssignmentController::class,'store'])->name('assignment.store');
    Route::post('/submission', [AssignmentSubmissionController::class, 'store'])->name('submission.store');
    Route::post('/feedback', [AssignmentSubmissionController::class, 'feedback'])->name('feedback.store');
    Route::patch('/submission/{assignmentSubmission}', [AssignmentSubmissionController::class, 'update'])->name('submission.update');

    // Chats
    Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
    Route::post('/message', [ChatController::class, 'store'])->name('message.send');
    Route::get('/read/{chat}', [ChatController::class, 'readMessage'])->name('message.read');

    // Forum
    Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
    Route::get('/forums/{cohort}', [ForumController::class, 'index'])->name('forum.index');

    // File
    Route::post('/file', [FileController::class, 'store'])->name('file.store');

    // Meetings
    Route::post('/meeting', [MeetingController::class,'store'])->name('meeting.store');
    Route::post('/attendance', [MeetingController::class, 'takeAttendance'])->name('take-attendance');

    // Tutors
    Route::get('/tutors', [TutorController::class, 'index'])->name('tutors');

    // Tasks
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks');
});
// Profile
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

Route::get('/assignments', [AssignmentController::class, 'index'])->name('assignments')->middleware(['auth', 'checktype:tutor']);

require __DIR__.'/auth.php';