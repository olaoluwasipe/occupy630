<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\User;

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

    public function approveUser (User $user) {
        if(Auth::user()->type !== 'superadmin' && Auth::user()->type !== 'employer') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if($user->status == 'pending') {
            $user->status = 'active';
            $user->save();

            return redirect()->back()->with('success', 'User approved successfully');
        }

        if($user->status == 'active') {
            $user->status = 'inactive';
            $user->save();

            return redirect()->back()->with('success','User deactivated successfully');
        }

        if($user->status == 'inactive') {
            $user->status = 'active';
            $user->save();

            return redirect()->back()->with('success','User activated successfully');
        }
    }
}
