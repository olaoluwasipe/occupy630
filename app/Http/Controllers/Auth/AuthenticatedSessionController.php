<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        
        $token = JWTAuth::fromUser(User::find(Auth::user()->id));
        // $token = '';
        // $credentials = $request->only(['email', 'password']);
        // if (! $token = auth('api')->attempt($credentials)) {
        //     return redirect()->back()->withErrors(['email' => 'Invalid credentials.']);
        // }

        $docLink = 'docs.tekphluent.co.uk?token=' . $token;

        session(['docs' => $docLink]);

        return redirect()->intended(route('home', absolute: false))->with('docs', $docLink);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // Invalidate JWT token
        // auth('api')->logout();

        return redirect('/');
    }
}
