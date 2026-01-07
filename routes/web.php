<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApartmentAttributeController;
use App\Http\Controllers\ApartmentCategoryController;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AssignmentSubmissionController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TutorController;
use App\Models\Apartment;
use App\Models\ApartmentCategory;
use App\Models\AssignmentSubmission;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $user = Auth::user();
    
    // Ensure user is authenticated (middleware should handle this, but adding safety check)
    if (!$user) {
        return redirect()->route('login');
    }

    // Redirect admin users to admin dashboard
    if ($user->type === 'admin' || $user->type === 'superadmin') {
        return redirect('/admin');
    }

    // Get user's cohorts and assignments
    $cohorts = $user->studentcohort;
    $assignments = $user->assignments;
    $current_time = Carbon::now();
    
    // Get tasks from cohorts
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

    // Get user's apartment if they are a tenant
    $apartment = Apartment::where('tenant_id', $user->id)
                ->with(['images', 'transactions' => function ($query) {
                    $query->with('user');
                    $query->orderBy('created_at', 'desc');
                }])
                ->first();

    // Convert the collection to an array
    $tasksArray = $tasks->toArray();

    return Inertia::render('Dashboard', [
        'courses' => $cohorts,
        'apartment' => $apartment,
        'assignments' => $assignments,
        'tasks' => $tasksArray,
        'docs' => session('docs'),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['auth', 'verified'])->name('home');

Route::post('request-rent-pay/{apartment}', [ApartmentController::class, 'requestRentPay'])->name('dashboard.rent.pay');

Route::prefix('/company')->middleware(['auth', 'checkcompany'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('company.dashboard');

    Route::post('/update', [CompanyController::class, 'update'])->name('company.update');

    Route::get('/register', [CompanyController::class, 'create'])->name('company.register');
});

Route::post('/create-apartment', [ApartmentController::class, 'store'])->name('apartment.store');
Route::post('/update-apartment/{apartment}', [ApartmentController::class, 'update'])->name('apartment.update');
Route::post('/send-inquiry', [ApartmentController::class, 'saveInquiry'])->name('apartment.send-inquiry');
Route::post('/create-attribute', [ApartmentAttributeController::class, 'store'])->name('apartment.attributes.store');
Route::post('/update-attribute', [ApartmentAttributeController::class, 'edit'])->name('apartment.attributes.update');
Route::post('/create-category', [ApartmentCategoryController::class, 'store'])->name('apartment.categories.store');
Route::post('/update-category', [ApartmentCategoryController::class, 'edit'])->name('apartment.categories.update');

Route::prefix('/admin')->middleware(['auth', 'checkadmin'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');
    // Users
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/user/view/{user}', [AdminController::class, 'viewUser'])->name('admin.view-user');
    Route::post('/create-user', [AdminController::class, 'createUser'])->name('admin.create-user');
    Route::post('/update-user/{user}', [AdminController::class, 'updateUser'])->name('admin.update-user');
    Route::delete('/delete-user/{user}', [AdminController::class, 'deleteUser'])->name('admin.delete-user');

    Route::group(['middleware' => ['can:upload apartments']], function () {
        Route::get('/apartments', [AdminController::class, 'apartments'])->name('admin.apartments');
        Route::post('/update-apartment/{apartment}', [AdminController::class, 'updateApartment'])->name('admin.update-apartment');
        Route::delete('/apartment/{apartment}', [AdminController::class, 'deleteApartment'])->name('admin.delete-apartment');
    });

    // Courses
    Route::group(['middleware' => ['can:manage all data']], function () {
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

    Route::get('/staff', function (Request $request) {
        $user = Auth::user();
        
        if (!$user || !$user->company) {
            return response()->json(['error' => 'User or company not found'], 404);
        }
        
        $company = $user->company;
        $staff = $company->users()->where('type', 'employee')->get();
        return $staff;
    })->name('api.staff.index');

    Route::post('/register-staff', [CompanyController::class, 'registerStaff'])->name('company.register-staff');

    // Courses
    Route::get('/courses', [CourseController::class, 'index'])->name('courses');
    Route::get('/course/{slug}', [CourseController::class,'show'])->name('course.show');

    // Apartments
    Route::post('/make-initial-payment', [ApartmentController::class, 'makeInitialPayment'])->name('payment.initial');
    Route::get('/apartments', [ApartmentController::class, 'index'])->name('apartments');
    Route::get('/apartment/{slug}', [ApartmentController::class,'show'])->name('apartment.show');

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

Route::get('/unauthorized', function () {
    return Inertia::render('Unauthorized');
})->name('unauthorized');

require __DIR__.'/auth.php';
