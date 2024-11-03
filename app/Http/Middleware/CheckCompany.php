<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckCompany
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if (!Auth::check() || ($user->type !== 'employer' && $user->type !== 'employee') || !$user->company) {
            abort(403, 'Unauthorized action.');
        }
        if(!$user->company->name) {
            redirect(route('company.register'));
        }
        return $next($request);
    }
}
