<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $shared = parent::share($request);
        
        // Ensure translations is always an object/array to prevent RegisterClientLocalizationsError
        // Inertia expects translations to be an object (associative array), not a list
        if (!isset($shared['translations']) || !is_array($shared['translations'])) {
            $shared['translations'] = [];
        }
        
        return array_merge($shared, [
            'auth' => [
                'user' => $request->user(),
            ],
            'success' => session('success'),
            'error' => session('error'),
            'status' => session('status'),
        ]);
    }
}
