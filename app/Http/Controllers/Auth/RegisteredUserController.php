<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Models\Company;
use App\Models\User;
use App\Rules\CompanyEmail;
use App\Rules\UniqueIf;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'code' => request()->code ?? null,
            'email' => request()->email ?? null,
            'type' => request()->type ?? null,
        ]
        );
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterUserRequest $request): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $user = $this->findOrCreateUser($request);
            if ($user->type === 'employer') {
                $this->createCompanyForEmployer($user);
            }

            $user->assignRole($user->type === 'superadmin' ? 'superadmin' : $request->type);

            $user->last_logged_in = now();
            $user->save();

            Auth::login($user);

            DB::commit();

            $link = $this->getRedirectLink($user);

            return redirect($link);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    private function findOrCreateUser(RegisterUserRequest $request): User
    {
        if ($request->type === 'employee' && strpos($request->email, '@cghomesltd.com') === false) {
            return $this->registerEmployee($request);
        }

        return User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'type' => strpos($request->email, '@cghomesltd.com') ? 'superadmin' : $request->type,
            'password' => Hash::make($request->password),
          	'status' => $request->type === 'landlord' ? 'active' : 'pending'
            //'email_verified_at' => strpos($request->email, '@cghomesltd.com') ? now() : null,
        ]);
    }

    private function registerEmployee(RegisterUserRequest $request): User
    {
        $user = User::where('email', $request->email)->first();

        if ($user && $request->code) {
            $user = $this->validateEmployeeCode($request, $user, $request->code);
        } else {
            $company = $this->getCompanyFromEmail($request->email);
            $user = User::create([
                'fname' => $request->fname,
                'lname' => $request->lname,
                'email' => $request->email,
                'type' => $request->type,
                'company_id' => $company->id ?? null,
                'password' => Hash::make($request->password),
            ]);
        }

        return $user;
    }

    private function validateEmployeeCode(RegisterUserRequest $request, User $user, string $code): User
    {
        if ($user->register_code !== $code) {
            $message = ['code' => 'Invalid code.'];
            throw new \Exception(json_encode($message));
        }

        $user->update([
            'register_code' => null,
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email_verified_at' => now(),
            'password' => Hash::make($request->password),
            'last_logged_in' => now(),
        ]);
        // dd($user);

        $user->assignRole('employee');

        return $user;
    }

    private function getCompanyFromEmail(string $email): ?Company
    {
        $domain = explode('@', $email)[1];
        $company = Company::where('url', $domain)->first();

        if (!$company) {
            throw new \Exception('Invalid company email address.');
        }

        return $company;
    }

    private function createCompanyForEmployer(User $user): void
    {
        $domain = explode('@', $user->email)[1];
        $company = Company::create([
            'email' => $user->email,
            'url' => $domain,
            'website' => fullUrl($domain),
            'user_id' => $user->id,
            'description' => '',
        ]);

        $user->company_id = $company->id;
        $user->save();
    }

    private function getRedirectLink(User $user): string
    {
        return match ($user->type) {
            // 'landlord' => route('home', absolute: false),
            'employer' => route('company.register', absolute: false),
            'employee' => route('employee.dashboard', absolute: false),
            'superadmin' => route('home', absolute: false),
            default => route('home', absolute: false),
        };
    }
}
