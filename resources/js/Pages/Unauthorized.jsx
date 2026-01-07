import React from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Unauthorized({ auth }) {
    return (
        <AuthLayout>
            <Head title="Unauthorized Access" />
            
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="mb-8">
                    <svg 
                        className="w-32 h-32 mx-auto text-red-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                        />
                    </svg>
                </div>
                
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Unauthorized Access
                </h1>
                
                <p className="text-xl text-gray-600 mb-2 max-w-md">
                    You don't have permission to access this resource.
                </p>
                
                <p className="text-gray-500 mb-8 max-w-md">
                    Please contact your administrator if you believe this is an error.
                </p>
                
                <div className="flex gap-4">
                    {auth?.user && (
                        <Link href={route('home')}>
                            <PrimaryButton className="px-6 py-3">
                                Go to Dashboard
                            </PrimaryButton>
                        </Link>
                    )}
                    
                    <Link href={route('login')}>
                        <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                            {auth?.user ? 'Back to Login' : 'Go to Login'}
                        </button>
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}

