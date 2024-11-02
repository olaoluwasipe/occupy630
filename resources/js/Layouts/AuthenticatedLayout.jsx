import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Chat from '@/Content/Chat';

export default function Authenticated({ user, header, children, docslink='' }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [openSideNav, setOpenSideNav] = useState(false)
    const [action, setAction] = useState('')

    const sideNav = (action) => {
        setAction(action)
        setOpenSideNav(true)
    }

    return (
        <div className="min-h-screen bg-white">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                            {user.type !== 'admin' ? (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    Home
                                </NavLink>
                                {user.type == 'learner' ? (
                                    <>
                                    <NavLink href={route('courses')} active={route().current('courses')}>
                                        My Courses
                                    </NavLink>
                                    <NavLink href={route('tutors')} active={route().current('tutors')}>
                                        My Tutors
                                        </NavLink>
                                        <NavLink href={route('tasks')} active={route().current('tasks')}>
                                            My Tasks
                                        </NavLink>
                                        </>
                                ) : (
                                    <>
                                    <NavLink href={route('courses')} active={route().current('courses')}>
                                        Courses
                                    </NavLink>
                                    <NavLink href={route('assignments')} active={route().current('assignments')}>
                                        Assignments
                                    </NavLink>
                                    <NavLink href={route('tasks')} active={route().current('tasks')}>
                                        Schedule
                                    </NavLink>
                                    </>
                                )}
                            </div>
                            ) : ''}

                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className='flex gap-2 items-center'>
                                <div onClick={() => sideNav('search')} className='cursor-pointer px-3'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.2496 8.12381C16.2496 9.91652 15.6676 11.5725 14.6873 12.9161L19.6319 17.8646C20.1201 18.3528 20.1201 19.1456 19.6319 19.6338C19.1437 20.1221 18.3508 20.1221 17.8626 19.6338L12.918 14.6853C11.5745 15.6696 9.91847 16.2476 8.12576 16.2476C3.63814 16.2476 0.00195312 12.6114 0.00195312 8.12381C0.00195312 3.63619 3.63814 0 8.12576 0C12.6134 0 16.2496 3.63619 16.2496 8.12381ZM8.12576 13.748C8.86434 13.748 9.59568 13.6025 10.278 13.3199C10.9604 13.0372 11.5804 12.623 12.1027 12.1007C12.6249 11.5784 13.0392 10.9584 13.3218 10.2761C13.6045 9.59373 13.7499 8.86239 13.7499 8.12381C13.7499 7.38523 13.6045 6.65389 13.3218 5.97153C13.0392 5.28917 12.6249 4.66917 12.1027 4.14692C11.5804 3.62466 10.9604 3.21039 10.278 2.92775C9.59568 2.64511 8.86434 2.49963 8.12576 2.49963C7.38718 2.49963 6.65584 2.64511 5.97348 2.92775C5.29113 3.21039 4.67112 3.62466 4.14887 4.14692C3.62662 4.66917 3.21234 5.28917 2.9297 5.97153C2.64706 6.65389 2.50159 7.38523 2.50159 8.12381C2.50159 8.86239 2.64706 9.59373 2.9297 10.2761C3.21234 10.9584 3.62662 11.5784 4.14887 12.1007C4.67112 12.623 5.29113 13.0372 5.97348 13.3199C6.65584 13.6025 7.38718 13.748 8.12576 13.748Z" fill="#222222"/>
                                    </svg>
                                </div>
                                <div onClick={() => sideNav('chat')} className='cursor-pointer px-3'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.74978 16.2507V15.7507H6.24978H2.49962C1.3968 15.7507 0.499512 14.8534 0.499512 13.7506V2.50011C0.499512 1.39728 1.3968 0.5 2.49962 0.5H17.5003C18.6031 0.5 19.5004 1.39728 19.5004 2.50011V13.7506C19.5004 14.8534 18.6031 15.7507 17.5003 15.7507H12.0821H11.9154L11.782 15.8507L6.95379 19.4729C6.95334 19.4732 6.9529 19.4736 6.95246 19.4739C6.90938 19.5048 6.85648 19.5069 6.81715 19.4872L6.59354 19.9345L6.81715 19.4872C6.77655 19.4669 6.74978 19.4258 6.74978 19.3758V16.2507Z" fill="white" stroke="#222222"/>
                                    </svg>
                                </div>
                                <div onClick={() => sideNav('notification')} className='cursor-pointer px-3'>
                                    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.2163 1.28125C10.2163 0.851562 10.5679 0.5 10.9976 0.5C11.4272 0.5 11.7788 0.851562 11.7788 1.28125V2.10156C15.729 2.49219 18.8101 5.82227 18.8101 9.875V11.2959C18.8101 13.4297 19.6597 15.4756 21.1685 16.9893L21.3052 17.126C21.7105 17.5312 21.9399 18.083 21.9399 18.6543C21.9399 19.8506 20.9731 20.8174 19.7769 20.8174H2.22314C1.02686 20.8125 0.0600586 19.8457 0.0600586 18.6494C0.0600586 18.0781 0.289551 17.5264 0.694824 17.1211L0.831543 16.9844C2.33545 15.4756 3.18506 13.4297 3.18506 11.2959V9.875C3.18506 5.82227 6.26611 2.49219 10.2163 2.10156V1.28125ZM10.9976 3.625C7.54541 3.625 4.74756 6.42285 4.74756 9.875V11.2959C4.74756 13.8447 3.73682 16.291 1.93018 18.0928L1.79834 18.2246C1.68604 18.3369 1.62256 18.4883 1.62256 18.6494C1.62256 18.9814 1.89111 19.25 2.22314 19.25H19.772C20.104 19.25 20.3726 18.9814 20.3726 18.6494C20.3726 18.4883 20.3091 18.3369 20.1968 18.2246L20.0601 18.0879C18.2583 16.2861 17.2427 13.8398 17.2427 11.291V9.875C17.2427 6.42285 14.4448 3.625 10.9927 3.625H10.9976ZM9.52295 22.8975C9.73779 23.5029 10.3188 23.9375 10.9976 23.9375C11.6763 23.9375 12.2573 23.5029 12.4722 22.8975C12.6138 22.4922 13.063 22.2773 13.4683 22.4189C13.8735 22.5605 14.0884 23.0098 13.9468 23.415C13.5171 24.6309 12.3599 25.5 10.9976 25.5C9.63526 25.5 8.47803 24.6309 8.04834 23.415C7.90674 23.0098 8.1167 22.5605 8.52686 22.4189C8.93701 22.2773 9.38135 22.4873 9.52295 22.8975Z" fill="#222222"/>
                                    </svg>
                                </div>
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
                        <ResponsiveNavLink href={route('courses')} active={route().current('courses')}>
                            My Courses
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('tutors')} active={route().current('tutors')}>
                            My Tutors
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('tasks')} active={route().current('tasks')}>
                            My Tasks
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
                    {action === 'notification' && <div>Notification</div>}
                </div>
            </Transition>
        </div>
    );
}
