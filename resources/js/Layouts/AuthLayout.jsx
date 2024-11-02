import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Auth({ children }) {
    return (
        <div className="min-h-screen md:flex items-center pt-6 sm:pt-0 bg-white">
            <div className='flex flex-col min-h-screen p-6 justify-between md:w-1/2'>
                <div className='px-6'>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-2xl md:mt-6 md:px-6 sm:px-2 py-4 ">
                    <h1 className='text-4xl text-bold'>Welcome To Occupy630</h1>
                    <p className='mb-10'>Please enter your login details to access the system.</p>
                    {children}
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
            <div className='flex-col hidden md:flex sm:hidden py-6 pr-6'>
                <div className='w-full h-screen'>
                    <img src="images/login-image.png" className=' w-full object-cover' />
                </div>
            </div>
        </div>
    );
}
