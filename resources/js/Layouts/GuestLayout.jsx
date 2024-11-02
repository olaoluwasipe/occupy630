import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-between py-6 items-center pt-6 sm:pt-0 bg-white">
            <div className='flex w-full px-6 pt-6 items-center flex-col'>
                <div className='w-full flex items-start'>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-2xl mt-6 px-6 py-4 bg-white text-center">
                    {children}
                </div>
            </div>
            <div className='flex gap-4 px-6'>
                <Link href='/'>
                    <p>Terms of Service</p>
                </Link>
                <Link href='/'>
                    <p>Privacy Policy</p>
                </Link>
                <Link href='/'>
                    <p>Contact Support</p>
                </Link>
            </div>
        </div>
    );
}
