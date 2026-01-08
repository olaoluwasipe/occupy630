<?php

namespace App\Http\Controllers;

use App\Mail\MailNotification;
use App\Models\Apartment;
use App\Models\ApartmentAttribute;
use App\Models\ApartmentCategory;
use App\Models\Cohort;
use App\Models\Company;
use App\Models\Course;
use App\Models\CourseModule;
use App\Models\Notification;
use App\Models\SystemSetting;
use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class AdminController extends Controller
{
    public function index () {
        $companies = Company::count();
        $employees = User::where('type', 'employee')->count();
        $employers = User::where('type','employer')->count();
        // $companies = User::where('type','employer')->count();
        $admin = User::where('type', 'admin')->count();
        return Inertia::render('Admin/Dashboard', [
            'companies' => $companies,
            'employees' => $employees,
            'employers' => $employers,
            'admins' => $admin,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function users () {
        $user = Auth::user();
        // $users = User::all();
        if ($user->can('manage users')) {
            $users = User::where('type', '!=', 'superadmin')
                ->where('type', '!=', 'admin')
                ->orderByDesc('created_at')
                ->get()
                ->map(function ($user) {
                    $user->company = $user->employedCompany ?? $user->company;
                    return $user;
                });
        } else {
            $users = collect(); // Use an empty collection for consistency
        }
        $companies = $user->can('manage companies') ? Company::all() : [];
        $admins = User::where('type', 'admin')->get();
        foreach($admins as $user) {
            $user->permissions = $user->getDirectPermissions()->pluck('name');
        }
        // $courses = $user->can('manage courses') ? Course::all() : [];
        // $cohorts = $user->can('manage courses') ? Cohort::all() : [];
        $permissions = Permission::all();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'companies' => $companies,
            // 'tutors' => $tutors,
            'admins' => $admins,
            'courses' => $courses,
            // 'cohorts' => $cohorts,
            'permissions' => $permissions
        ]);
    }

    public function apartments (Request $request) {
        $perPage = $request->get('per_page', 15);
        
        $query = Apartment::orderBy('id', 'desc')
            ->with(['images', 'category', 'landlord']); // Eager loading to prevent N+1
        
        // Cache attributes and categories as they don't change frequently
        $apartmentAttributes = Cache::remember('apartment_attributes', 3600, function () {
            return ApartmentAttribute::all();
        });
        
        $apartmentCategories = Cache::remember('apartment_categories', 3600, function () {
            return ApartmentCategory::all();
        });
        
        $apartments = $query->paginate($perPage);
        
        return Inertia::render('Admin/Apartments/Index', [
            'apartments' => $apartments->items(),
            'pagination' => [
                'current_page' => $apartments->currentPage(),
                'last_page' => $apartments->lastPage(),
                'per_page' => $apartments->perPage(),
                'total' => $apartments->total(),
            ],
            'attributes' => $apartmentAttributes,
            'categories' => $apartmentCategories,
        ]);
    }

    // public function courses () {
    //     $courses = Course::with('cohorts.assignments', 'cohorts.tutor', 'cohorts.students', 'cohorts.files.user', 'modules')->get();
    //     return Inertia::render('Admin/Courses/Index', [
    //         'courses' => $courses,
    //     ]);
    // }

    // public function sessions () {
    //     $sessions = Cohort::with('course', 'tutor','students')->get();
    //     $courses = Course::all();
    //     $tutors = User::where('type', 'tutor')->get();
    //     return Inertia::render('Admin/Sessions/Index', [
    //         'sessions' => $sessions,
    //         'courses' => $courses,
    //         'tutors' => $tutors,
    //     ]);
    // }

    // public function communications () {
    //     $notifyId = DB::table('notifications')
    //                     ->select('notifiable_id', 'type')
    //                     ->groupBy('notifiable_id', 'type')
    //                     ->get();
    //     $notifications = $notifyId->map(function($notif) {
    //         return Notification::where('notifiable_id', $notif->notifiable_id)->where('type', $notif->type)->with('notifiable.user', 'notifiable.cohort.course', 'notifiable.cohort.tutor')->latest('id')->first();
    //     });
    //     // $notifications = Notification::with('user', 'notifiable')->whereIn('notifiable_id', $notifyId)->get();
    //     return Inertia::render('Admin/Communications/Index', [
    //         'notifications' => $notifications,
    //     ]);
    // }

    public function settings () {
        $settings = SystemSetting::all();
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function createUser () {
        $validatedData = request()->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'userType' => 'required|in:employer,landlord,admin,superadmin',
            'gender' => 'required|in:Male,Female,Other',
            'phoneNumber' => 'required|string|max:20',
            'nationality' => 'required|string|max:50',
            'address' => 'required|string|max:255',
            'permissions' => 'nullable|array',
        ]);

        $generatedPassword = $this->generateRandomString();

        $user = User::create([
            'fname' => $validatedData['fname'],
            'lname' => $validatedData['lname'],
            'email' => $validatedData['email'],
            'password' => Hash::make($generatedPassword),
            'type' => $validatedData['userType'],
            'gender' => $validatedData['gender'],
            'phonenumber' => $validatedData['phoneNumber'],
            'nationality' => $validatedData['nationality'],
            'address' => $validatedData['address'],
        ]);

        if($validatedData['userType'] === 'superadmin') {
            $user->assignRole('superadmin');
        }

        foreach ($validatedData['permissions'] as $permission) {
            if($permission['status'] === true) $user->givePermissionTo($permission['permission_id']);
        }

        // if ($validatedData['userType'] === 'employee') {
        //     $user->studentcohort()->attach(request('session'));
        // }

        $subject = 'Welcome to Occupy630!';
        $body = 'Your account has been created successfully as a '.$user->type.'. Please use this email and this password to login: ' . $generatedPassword . '.'.PHP_EOL.'And don\'t forget to change your password after login.';
        $link = route('login');
        Mail::to($user->email)->send(new MailNotification($subject, $body, $link, $subject));

        return redirect()->route('admin.users')->with('success', 'User created successfully.');
    }

    public function updateUser (Request $request, User $user) {
        $validatedData = request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'userType' => 'required|in:learner,tutor,admin,superadmin',
            'gender' => 'required|in:Male,Female,Other',
            'phoneNumber' => 'required|string|max:20',
            'nationality' => 'required|string|max:50',
            'address' => 'required|string|max:255',
            'permissions' => 'required|array',
        ]);

        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'type' => $validatedData['userType'],
            'gender' => $validatedData['gender'],
            'phonenumber' => $validatedData['phoneNumber'],
            'nationality' => $validatedData['nationality'],
            'address' => $validatedData['address'],
        ]);

        $permissions = $user->permissions;

        foreach ($validatedData['permissions'] as $permission) {
            if($permission['status'] === true){
                if(!$user->hasPermissionTo($permission['permission_id'])) {
                    $user->givePermissionTo($permission['permission_id']);
                }
            } else {
                if($user->hasPermissionTo($permission['permission_id'])) {
                    $user->revokePermissionTo($permission['permission_id']);
                }
            }
        }

        // return response()->json($validatedData['permissions']);
        return redirect()->route('admin.users')->with('success', 'User updated successfully.');
    }

    // public function viewUser (User $user) {
    //     $user = $user->load('studentcohort')->load('tutorcohort');
    //     if($user->type === 'learner') {
    //         $user->courses = $user->studentcohort->map(function ($cohort) {
    //             return $cohort->course;
    //         });
    //     }else {
    //         $user->courses = $user->tutorcohort->map(function ($cohort) {
    //             return $cohort->course;
    //         });
    //     }
    //     $user->session = DB::table('sessions')->where('id', $user->id)->latest('id')->first()?->last_activity;
    //     $user->assignments = $user->studentcohort->map(function ($cohort) {
    //         $cohort->assignments = $cohort->assignments->map(function ($assignment) {
    //             $submissions = $assignment->submissions->map(function ($submission) {
    //                 $submission->user = $submission->user->load('studentcohort');

    //                 return $submission;
    //             });
    //             return $assignment;
    //         });
    //         return $cohort->assignments;
    //     });
    //     return Inertia::render('Admin/Users/View', [
    //         'user' => $user,
    //     ]);
    // }

    // public function deleteUser (User $user) {
    //     $user->delete();
    //     return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    // }

    // public function createCourse (Request $request) {
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'description' => 'required|string',
    //         'objectives' => 'required|string',
    //     ]);

    //     $course = Course::create([
    //         'title' => $validatedData['title'],
    //         'description' => $validatedData['description'],
    //         'outline' => $validatedData['objectives'],
    //         'objectives' => $validatedData['objectives'],
    //     ]);

    //     if($request->has('modules')) {
    //         foreach ($request->modules as $module) {
    //             CourseModule::create([
    //                 'title' => $module['title'],
    //                 'description' => $module['description'],
    //                 'course_id' => $course->id,
    //             ]);
    //         }
    //     }

    //     return redirect()->route('admin.courses')->with('success', 'Course created successfully.');

    // }

    // public function updateCourse (Request $request, Course $course) {
    //     $validatedData = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'description' => 'required|string',
    //         'objectives' => 'required|string',
    //     ]);

    //     $course->update([
    //         'title' => $validatedData['title'],
    //         'description' => $validatedData['description'],
    //         'objectives' => $validatedData['objectives'],
    //     ]);

    //     if($request->has('modules')) {
    //         foreach ($request->modules as $module) {
    //             if(isset($module['id'])) {
    //                 $moduleUp = CourseModule::find($module['id']);
    //                 $moduleUp->update([
    //                     'title' => $module['title'],
    //                     'description' => $module['description'],
    //                 ]);
    //             }else {
    //                 CourseModule::create([
    //                     'title' => $module['title'],
    //                     'description' => $module['description'],
    //                     'course_id' => $course->id,
    //                 ]);
    //             }
    //         }
    //     }

    //     return redirect()->route('admin.courses')->with('success', 'Course updated successfully.');
    // }

    // public function deleteCourse (Course $course) {
    //     $course->delete();
    //     return redirect()->route('admin.courses')->with('success', 'Course deleted successfully.');
    // }

    // public function createSession (Request $request) {
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'startDate' => 'required|string',
    //         'endDate' => 'required|string',
    //         'course' => 'required|integer',
    //         'tutor' => 'required|integer',
    //     ]);
    //     $session = Cohort::create([
    //         'name' => $validatedData['name'],
    //         'start_date' => $validatedData['startDate'],
    //         'end_date' => $validatedData['endDate'],
    //         'course_id' => $validatedData['course'],
    //     ]);

    //     $session->tutor()->attach(request('tutor'));

    //     return redirect()->route('admin.sessions')->with('success', 'Session created successfully.');
    // }

    // public function updateSession (Request $request, Cohort $session) {
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'startDate' => 'required|string',
    //         'endDate' => 'required|string',
    //         'course' => 'required|integer',
    //         'tutor' => 'required|integer',
    //     ]);
    //     $session->update([
    //         'name' => $validatedData['name'],
    //         'start_date' => $validatedData['startDate'],
    //         'end_date' => $validatedData['endDate'],
    //         'course_id' => $validatedData['course'],
    //     ]);

    //     $session->tutor()->sync(request('tutor'));

    //     return redirect()->route('admin.sessions')->with('success', 'Session updated successfully.');
    // }

    // public function deleteSession (Cohort $session) {
    //     $session->delete();
    //     return redirect()->route('admin.sessions')->with('success', 'Session deleted successfully.');
    // }
}
