<?php

namespace App\Http\Controllers;

use App\Mail\MailNotification;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login']]);
    // }

    public function login () {
        $credentials = request(['email', 'password']);

        if(! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
    * Get the authenticated User.
    *
    * @return \Illuminate\Http\JsonResponse
    */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
        * Log the user out (Invalidate the token).
        *
        * @return \Illuminate\Http\JsonResponse
        */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
        * Refresh a token.
        *
        * @return \Illuminate\Http\JsonResponse
        */
    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    /**
        * Get the token array structure.
        *
        * @param  string $token
        *
        * @return \Illuminate\Http\JsonResponse
        */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function deleteUser (User $user) {
        if(Auth::user()->type !== 'superadmin' && Auth::user()->type !== 'employer') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if(Apartment::where('tenant_id', $user->id)->exists()) {
            // return redirect()->back()->with('error', 'User has an apartment');
            return response()->json(['error' => 'Can\'t delete because the user has an apartment'], 401);
        }
        if(Auth::user()->id == $user->employedCompany->owner->id) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function approveUser(User $user)
    {
        // Check if the authenticated user is authorized to perform this action
        if (!in_array(Auth::user()->type, ['superadmin', 'employer'])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Define status transitions and mail details
        $statusTransitions = [
            'pending' => [
                'new_status' => 'active',
                'subject' => 'Your account has been activated',
                'header' => 'Your account is now active',
                'body' => 'Your account has been activated. You can now log in to your account.',
            ],
            'active' => [
                'new_status' => 'inactive',
                'subject' => 'Your account has been deactivated',
                'header' => 'Your account is now inactive',
                'body' => 'Your account has been deactivated. Please contact support for more details.',
            ],
            'inactive' => [
                'new_status' => 'active',
                'subject' => 'Your account has been reactivated',
                'header' => 'Welcome back! Your account is active again',
                'body' => 'Your account has been reactivated. You can now log in to your account.',
            ],
        ];

        // Handle status change and send email
        if (array_key_exists($user->status, $statusTransitions)) {
            $transition = $statusTransitions[$user->status];

            // Update the user's status
            $user->status = $transition['new_status'];
            $user->save();

            // Send notification email
            $link = route('login');
            Mail::to($user->email)->send(new MailNotification(
                $transition['subject'],
                $transition['body'],
                $link,
                $transition['header']
            ));

            return redirect()->back()->with('success', 'User status updated successfully.');
        }

        // If the status is unexpected, return an error
        return redirect()->back()->with('error', 'Invalid user status.');
    }

}
