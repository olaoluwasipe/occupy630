import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Chat from '@/Content/Chat';
import { FaSearch } from 'react-icons/fa';
import { FiBell, FiMessageSquare, FiSearch } from "react-icons/fi";
import { FaMessage, FaRegMessage } from 'react-icons/fa6';
import Notifications from '@/Content/Notifications/Notifications';
import ThemeToggle from '@/Components/ThemeToggle';
import NotificationCenter from '@/Components/NotificationCenter';

export default function Authenticated({ user, header, children, docslink='', openNav=false, prevAction='' }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [openSideNav, setOpenSideNav] = useState(openNav)
    const [action, setAction] = useState(prevAction)

    useEffect(() => {
        // If openNav or prevAction prop changes, update the state
        setOpenSideNav(openNav);
        setAction(prevAction);
    }, [openNav, prevAction]);

    // sideNav function to update both action and openSideNav
    const sideNav = (action) => {
        setAction(action);
        setOpenSideNav(true);
    };
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                            {/* {user.type !== 'admin' ? (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    Home
                                </NavLink>
                                {user.type == 'employee' && (
                                    <>
                                        <NavLink href={route('apartments')} active={route().current('apartments')}>
                                            Apartments
                                        </NavLink>
                                    </>
                                )}
                                {user.type == 'employer' && (
                                    <>
                                    <NavLink href={route('apartments')} active={route().current('apartments')}>
                                        Apartments
                                    </NavLink>
                                    </>
                                )}
                            </div>
                            ) : ''} */}

                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className='flex gap-2 items-center'>
                                <ThemeToggle />
                                <div onClick={() => sideNav('search')} className='cursor-pointer px-3 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors'>
                                    <FiSearch size={25} />
                                </div>
                                <div onClick={() => sideNav('chat')} className='cursor-pointer px-3 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors'>
                                    <FiMessageSquare size={25} />
                                </div>
                                <NotificationCenter user={user} />
                            </div>
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        {docslink && <Dropdown.Link href={`https://${docslink}`}>Docs</Dropdown.Link>}
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                            Home
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main onClick={()=> setOpenSideNav(false)} >{children}</main>
            <Transition
                show={openSideNav}
                enter="transition ease-in-out"
                enterFrom="translate-x-full"
                leave="transition ease-in-out"
                leaveTo="translate-x-full"

            >
                <div className="text-sm right-0 bg-white shadow fixed h-[100vh] w-96 top-0 p-4 text-gray-600">
                    {action === 'search' && <div></div> }
                    {action === 'chat' && <Chat user={user} chats={''} close={() => setOpenSideNav(false)} />}
                    {action === 'notification' && <Notifications notifications={user.notifications}/>}
                </div>
            </Transition>
        </div>
    );
}
