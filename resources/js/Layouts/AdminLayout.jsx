import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import IconTextInput from '@/Components/IconTextInput';
import { FaHouse } from 'react-icons/fa6';

export default function Admin({ user, title, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="h-screen overflow-hidden bg-white flex flex-row">
            <nav className="bg-white border-b w-1/5 border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                            <div className="shrink-0 flex w-full justify-center items-center h-16">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden flex-col justify-between h-[90vh] py-10 sm:-my-px sm:flex">
                                <div className="flex flex-col border-t-gray-300 m-l-3 border-2">
                                    <NavLink style={{margin: 0, marginLeft: '10px', padding: '15px', justifyContent: 'start'}} className='border-b-gray-300 gap-5 m-l-3 border-2' href={route('admin')} active={route().current('admin')}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.4608 8.69904C19.4603 8.69858 19.4599 8.69812 19.4594 8.69766L11.301 0.539551C10.9532 0.19165 10.4909 0 9.9991 0C9.50731 0 9.04497 0.191498 8.69707 0.539398L0.542928 8.69339C0.540182 8.69614 0.537435 8.69904 0.534688 8.70178C-0.179423 9.42001 -0.178202 10.5853 0.538198 11.3017C0.865499 11.6292 1.29778 11.8188 1.75997 11.8387C1.77874 11.8405 1.79766 11.8414 1.81673 11.8414H2.1419V17.8453C2.1419 19.0334 3.10854 20 4.2969 20H7.48873C7.81221 20 8.07467 19.7377 8.07467 19.4141V14.707C8.07467 14.1649 8.51564 13.7239 9.05779 13.7239H10.9404C11.4826 13.7239 11.9235 14.1649 11.9235 14.707V19.4141C11.9235 19.7377 12.1858 20 12.5095 20H15.7013C16.8897 20 17.8563 19.0334 17.8563 17.8453V11.8414H18.1578C18.6495 11.8414 19.1118 11.6499 19.4599 11.302C20.177 10.5844 20.1773 9.41711 19.4608 8.69904Z" fill={route().current('admin') ? `#343C6A` : '#888888'}/>
                                        </svg>
                                        Dashboard
                                    </NavLink>
                                    <NavLink style={{margin: 0, marginLeft: '10px', padding: '15px', justifyContent: 'start'}} className='border-b-gray-300 gap-5 m-l-3 border-2' href={route('admin.users')} active={route().current('admin.users')}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_909_81)">
                                            <path d="M10.0002 10C11.374 10 12.5636 9.50727 13.5356 8.53511C14.5076 7.56312 15.0004 6.37382 15.0004 4.99984C15.0004 3.62634 14.5076 2.43688 13.5355 1.46457C12.5633 0.49273 11.3738 0 10.0002 0C8.6262 0 7.43689 0.49273 6.46489 1.46473C5.49289 2.43673 5 3.62618 5 4.99984C5 6.37382 5.49289 7.56327 6.46505 8.53527C7.43721 9.50711 8.62667 10 10.0002 10Z" fill={route().current('admin.users') ? `#343C6A` : '#888888'}/>
                                            <path d="M20.3784 15.5305C20.3446 15.1536 20.2763 14.7425 20.1758 14.3083C20.0743 13.8709 19.9437 13.4573 19.7873 13.0794C19.6257 12.6888 19.406 12.303 19.1344 11.9333C18.8525 11.5496 18.5214 11.2155 18.1498 10.9405C17.7613 10.6529 17.2856 10.4216 16.7355 10.253C16.1873 10.0852 15.5799 10.0001 14.93 10.0001C14.6748 10.0001 14.428 10.0812 13.9514 10.3213C13.658 10.4693 13.3149 10.6405 12.9319 10.8298C12.6044 10.9913 12.1607 11.1426 11.6128 11.2795C11.0781 11.4134 10.5353 11.4813 9.99953 11.4813C9.46375 11.4813 8.92111 11.4134 8.38591 11.2795C7.8385 11.1427 7.39485 10.9914 7.06774 10.83C6.68837 10.6424 6.34505 10.4712 6.04731 10.3211C5.57124 10.081 5.32423 10 5.06903 10C4.41901 10 3.81171 10.0852 3.26373 10.2531C2.71403 10.4215 2.23814 10.6527 1.84924 10.9407C1.47787 11.2158 1.14657 11.5497 0.865044 11.9333C0.593628 12.303 0.373901 12.6886 0.212158 13.0795C0.0559464 13.4575 -0.074707 13.8709 -0.176178 14.3083C-0.276695 14.7419 -0.344978 15.1532 -0.378738 15.531C-0.411926 15.9011 -0.428711 16.2853 -0.428711 16.6733C-0.428711 17.683 -0.0138626 18.5004 0.804199 19.1033C1.61215 19.6982 2.68122 20 3.98127 20H16.0189C17.319 20 18.3877 19.6983 19.1958 19.1033C20.0141 18.5009 20.4289 17.6833 20.4289 16.6731C20.4287 16.2834 20.4117 15.8989 20.3784 15.5305Z" fill={route().current('admin.users') ? `#343C6A` : '#888888'}/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_909_81">
                                            <rect width="20" height="20" fill="white"/>
                                            </clipPath>
                                            </defs>
                                        </svg>

                                        User Management
                                    </NavLink>
                                    <NavLink style={{margin: 0, marginLeft: '10px', padding: '15px', justifyContent: 'start'}} className='border-b-gray-300 gap-5 m-l-3 border-2' href={route('admin.apartments')} active={route().current('admin.apartments')}>
                                        <FaHouse size={20} />

                                        Property Management
                                    </NavLink>
                                    <NavLink style={{margin: 0, marginLeft: '10px', padding: '15px', justifyContent: 'start'}} className='border-b-gray-300 gap-5 m-l-3 border-2' href={route('admin.courses')} active={route().current('admin.courses')}>
                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.66667 15.6134C9.04167 15.7454 9.44444 15.4711 9.44444 15.0753V1.97108C9.44444 1.82525 9.38889 1.67942 9.27083 1.58914C8.59028 1.04747 7.02778 0.353027 5 0.353027C3.24653 0.353027 1.60764 0.814833 0.628472 1.18983C0.236111 1.34261 0 1.7315 0 2.15164V15.0093C0 15.4225 0.444444 15.7107 0.836806 15.5822C1.93056 15.2176 3.66319 14.7975 5 14.7975C6.17708 14.7975 7.74306 15.2836 8.66667 15.6134ZM11.3333 15.6134C12.2569 15.2836 13.8229 14.7975 15 14.7975C16.3368 14.7975 18.0694 15.2176 19.1632 15.5822C19.5556 15.7141 20 15.4225 20 15.0093V2.15164C20 1.7315 19.7639 1.34261 19.3715 1.19331C18.3924 0.814833 16.7535 0.353027 15 0.353027C12.9722 0.353027 11.4097 1.04747 10.7292 1.58914C10.6146 1.67942 10.5556 1.82525 10.5556 1.97108V15.0753C10.5556 15.4711 10.9618 15.7454 11.3333 15.6134Z" fill={route().current('admin.courses') ? `#343C6A` : '#888888'}/>
                                        </svg>
                                        Course Management
                                    </NavLink>

                                    {user.type === 'superadmin' && (
                                        <>
                                        <NavLink style={{margin: 0, marginLeft: '10px', padding: '15px', justifyContent: 'start'}} className='border-b-gray-300 gap-5 m-l-3 border-2' href={route('admin.sessions')} active={route().current('admin.sessions')}>
                                            <svg width="20" height="27" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.33333 0C1.49479 0 0 1.49479 0 3.33333V23.3333C0 25.1719 1.49479 26.6667 3.33333 26.6667H16.6667C18.5052 26.6667 20 25.1719 20 23.3333V8.33333H13.3333C12.4115 8.33333 11.6667 7.58854 11.6667 6.66667V0H3.33333ZM13.3333 0V6.66667H20L13.3333 0ZM5.83333 13.3333H14.1667C14.625 13.3333 15 13.7083 15 14.1667C15 14.625 14.625 15 14.1667 15H5.83333C5.375 15 5 14.625 5 14.1667C5 13.7083 5.375 13.3333 5.83333 13.3333ZM5.83333 16.6667H14.1667C14.625 16.6667 15 17.0417 15 17.5C15 17.9583 14.625 18.3333 14.1667 18.3333H5.83333C5.375 18.3333 5 17.9583 5 17.5C5 17.0417 5.375 16.6667 5.83333 16.6667ZM5.83333 20H14.1667C14.625 20 15 20.375 15 20.8333C15 21.2917 14.625 21.6667 14.1667 21.6667H5.83333C5.375 21.6667 5 21.2917 5 20.8333C5 20.375 5.375 20 5.83333 20Z" fill={route().current('admin.sessions') ? `#343C6A` : '#888888'}/>
                                            </svg>

                                            Session Management
                                        </NavLink>
                                        <NavLink style={{margin: 0, marginLeft: '10px', padding: '15px', justifyContent: 'start'}} className='border-b-gray-300 gap-5 m-l-3 border-2' href={route('admin.communications')} active={route().current('admin.communications')}>
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.75027 16.9173V16.4173H6.25027H2.50011C1.39728 16.4173 0.5 15.52 0.5 14.4172V3.16673C0.5 2.06391 1.39728 1.16663 2.50011 1.16663H17.5008C18.6036 1.16663 19.5009 2.06391 19.5009 3.16673V14.4172C19.5009 15.52 18.6036 16.4173 17.5008 16.4173H12.0825H11.9158L11.7825 16.5174L6.95427 20.1395C6.95383 20.1399 6.95339 20.1402 6.95295 20.1405C6.90987 20.1714 6.85697 20.1735 6.81764 20.1539L6.59403 20.6011L6.81764 20.1539C6.77703 20.1336 6.75027 20.0924 6.75027 20.0425V16.9173Z" fill={route().current('admin.communications') ? `#343C6A` : '#888888'} stroke={route().current('admin.communications') ? `#343C6A` : '#888888'}/>
                                            </svg>

                                            Communications
                                        </NavLink>
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-col border-t-gray-200 m-l-3 border-2">
                                    {user.type === 'superadmin' && (
                                    <NavLink style={{margin: 0, marginLeft: '10px', padding: '15px', justifyContent: 'start'}} className='border-b-gray-200 gap-5 m-l-3 border-2' href={route('admin.settings')} active={route().current('admin.settings')}>
                                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.9446 7.29695C20.0772 7.65752 19.9653 8.05953 19.6793 8.31648L17.8848 9.94939C17.9304 10.2934 17.9552 10.6457 17.9552 11.0021C17.9552 11.3585 17.9304 11.7108 17.8848 12.0548L19.6793 13.6877C19.9653 13.9446 20.0772 14.3466 19.9446 14.7072C19.7622 15.2004 19.5425 15.6728 19.2897 16.1287L19.0949 16.4644C18.8214 16.9203 18.5147 17.3513 18.179 17.7575C17.9345 18.0559 17.5284 18.1554 17.1636 18.0393L14.8552 17.3057C14.2998 17.7326 13.6865 18.089 13.0317 18.3584L12.5136 20.7249C12.4307 21.102 12.1406 21.4004 11.7593 21.4626C11.1874 21.5579 10.5989 21.6077 9.99793 21.6077C9.39699 21.6077 8.80848 21.5579 8.23654 21.4626C7.85526 21.4004 7.56515 21.102 7.48226 20.7249L6.96421 18.3584C6.30939 18.089 5.69601 17.7326 5.14066 17.3057L2.83635 18.0435C2.47164 18.1595 2.06549 18.0559 1.82097 17.7616C1.48527 17.3555 1.17858 16.9245 0.90505 16.4686L0.710262 16.1329C0.457452 15.677 0.237797 15.2045 0.0554424 14.7113C-0.0771793 14.3508 0.0347202 13.9488 0.320686 13.6918L2.11522 12.0589C2.06963 11.7108 2.04477 11.3585 2.04477 11.0021C2.04477 10.6457 2.06963 10.2934 2.11522 9.94939L0.320686 8.31648C0.0347202 8.05953 -0.0771793 7.65752 0.0554424 7.29695C0.237797 6.80377 0.457452 6.3313 0.710262 5.87541L0.90505 5.53971C1.17858 5.08383 1.48527 4.65281 1.82097 4.24665C2.06549 3.94825 2.47164 3.84879 2.83635 3.96483L5.1448 4.6984C5.70015 4.27152 6.31353 3.9151 6.96835 3.64571L7.4864 1.27924C7.56929 0.902099 7.8594 0.6037 8.24069 0.541533C8.81262 0.442067 9.40113 0.392334 10.0021 0.392334C10.603 0.392334 11.1915 0.442067 11.7635 0.537389C12.1447 0.599555 12.4349 0.897954 12.5177 1.2751L13.0358 3.64157C13.6906 3.91095 14.304 4.26738 14.8593 4.69425L17.1678 3.96069C17.5325 3.84464 17.9387 3.94825 18.1832 4.24251C18.5189 4.64866 18.8256 5.07968 19.0991 5.53557L19.2939 5.87127C19.5467 6.32716 19.7663 6.79962 19.9487 7.29281L19.9446 7.29695ZM10.0021 14.3176C10.8814 14.3176 11.7247 13.9683 12.3465 13.3465C12.9683 12.7247 13.3176 11.8814 13.3176 11.0021C13.3176 10.1227 12.9683 9.27941 12.3465 8.65763C11.7247 8.03584 10.8814 7.68653 10.0021 7.68653C9.12274 7.68653 8.27941 8.03584 7.65763 8.65763C7.03584 9.27941 6.68653 10.1227 6.68653 11.0021C6.68653 11.8814 7.03584 12.7247 7.65763 13.3465C8.27941 13.9683 9.12274 14.3176 10.0021 14.3176Z" fill={route().current('admin.settings') ? `#343C6A` : '#888888'}/>
                                        </svg>

                                        System Settings
                                    </NavLink>
                                    )}
                                    <NavLink href={route('logout')} method="post" as="button" style={{margin: 0, marginLeft: '10px', padding: '15px', justifyContent: 'start'}} className='border-b-gray-200 gap-5 m-l-3 border-2'>
                                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.3333 2.00001C11.3333 1.2625 10.7375 0.666672 10 0.666672C9.2625 0.666672 8.66667 1.2625 8.66667 2.00001V11.3333C8.66667 12.0708 9.2625 12.6667 10 12.6667C10.7375 12.6667 11.3333 12.0708 11.3333 11.3333V2.00001ZM5.3125 5.69167C5.87917 5.22084 5.95417 4.37917 5.48333 3.81251C5.0125 3.24584 4.17083 3.17084 3.60417 3.64167C1.40417 5.475 0 8.24167 0 11.3333C0 16.8542 4.47917 21.3333 10 21.3333C15.5208 21.3333 20 16.8542 20 11.3333C20 8.24167 18.5917 5.475 16.3917 3.64167C15.825 3.17084 14.9833 3.25001 14.5125 3.81251C14.0417 4.375 14.1208 5.22084 14.6833 5.69167C16.3042 7.0375 17.3292 9.06667 17.3292 11.3333C17.3292 15.3833 14.0458 18.6667 9.99583 18.6667C5.94583 18.6667 2.6625 15.3833 2.6625 11.3333C2.6625 9.06667 3.69167 7.0375 5.30833 5.69167H5.3125Z" fill="#888888"/>
                                        </svg>

                                        Log Out
                                    </NavLink>
                                </div>
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
                            <div className="font-medium text-base text-gray-800">Welcome, {user.fname}</div>
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

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

            <main className='w-4/5'>
                <div className='mx-auto max-w-7xl flex gap-3 justify-between h-16 items-center px-4'>
                    <div className='flex flex-row items-center justify-between w-full gap-5'>
                        <p className='text-xl uppercase text-indigo-900 font-bold'>{title}</p>
                        <IconTextInput
                            icon=<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.625 6.99905C13.625 8.43321 13.1595 9.75802 12.3752 10.8329L16.3309 14.7917C16.7215 15.1822 16.7215 15.8165 16.3309 16.2071C15.9403 16.5976 15.306 16.5976 14.9155 16.2071L10.9598 12.2483C9.88497 13.0357 8.56016 13.4981 7.126 13.4981C3.5359 13.4981 0.626953 10.5891 0.626953 6.99905C0.626953 3.40895 3.5359 0.5 7.126 0.5C10.7161 0.5 13.625 3.40895 13.625 6.99905ZM7.126 11.4984C7.71686 11.4984 8.30194 11.382 8.84782 11.1559C9.39371 10.9298 9.88971 10.5984 10.3075 10.1806C10.7253 9.76276 11.0567 9.26676 11.2828 8.72087C11.509 8.17499 11.6253 7.58991 11.6253 6.99905C11.6253 6.40819 11.509 5.82311 11.2828 5.27722C11.0567 4.73134 10.7253 4.23534 10.3075 3.81753C9.88971 3.39973 9.39371 3.06831 8.84782 2.8422C8.30194 2.61609 7.71686 2.49971 7.126 2.49971C6.53514 2.49971 5.95006 2.61609 5.40418 2.8422C4.85829 3.06831 4.36229 3.39973 3.94449 3.81753C3.52668 4.23534 3.19526 4.73134 2.96915 5.27722C2.74304 5.82311 2.62666 6.40819 2.62666 6.99905C2.62666 7.58991 2.74304 8.17499 2.96915 8.72087C3.19526 9.26676 3.52668 9.76276 3.94449 10.1806C4.36229 10.5984 4.85829 10.9298 5.40418 11.1559C5.95006 11.382 6.53514 11.4984 7.126 11.4984Z" fill="#717171"/>
                                </svg>
                            style={{borderRadious: '900px'}}
                            rounded="rounded-full"
                            className='border border-gray-400 min-w-96 bg-slate-50 rounded-full'
                            placeholder='Search users, courses, etc...'
                        />

                        {/* User Info */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                Welcome, {user.fname}

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
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-auto min-h-screen overflow-auto py-3 bg-gray-100 px-4 sm:px-6 lg:px-8'>{children}</div>
            </main>
        </div>
    );
}
