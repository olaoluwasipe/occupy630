import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import ProfilePhoto from '@/Components/ProfilePhoto';

export default function Dashboard({ auth, courses, tutors, students, admins }) {
    // console.log(courses)
    return (
        <AdminLayout
            user={auth.user}
            title="Dashboard"
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

        <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h3 className='font-semibold text-xl text-indigo-500'>Statistics </h3>
                    <div className="overflow-hidden sm:rounded-lg flex gap-5 flex-row items-center">
                        <div className='flex flex-1 flex-col justify-center flex-wrap bg-white p-5 rounded-lg h-100'>
                            <p className='text-gray-500 font-semibold w-full mb-5'>Total Learners Count</p>
                            <div className='flex flex-row items-center justify-between'>
                                <h2 className='text-2xl w-1/2 font-bold'>{students}</h2>
                                <svg width="60" className='w-1/4' height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="60" height="60" rx="20" fill="#DADADA"/>
                                <path opacity="0.587821" fill-rule="evenodd" clip-rule="evenodd" d="M20.6665 23.3333C20.6665 26.2789 23.0543 28.6667 25.9998 28.6667C28.9454 28.6667 31.3332 26.2789 31.3332 23.3333C31.3332 20.3878 28.9454 18 25.9998 18C23.0543 18 20.6665 20.3878 20.6665 23.3333ZM33.9998 28.6667C33.9998 30.8758 35.7907 32.6667 37.9998 32.6667C40.209 32.6667 41.9998 30.8758 41.9998 28.6667C41.9998 26.4575 40.209 24.6667 37.9998 24.6667C35.7907 24.6667 33.9998 26.4575 33.9998 28.6667Z" fill="#3D42DF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9778 31.3333C19.6826 31.3333 14.5177 34.5687 14.0009 40.9323C13.9727 41.2789 14.6356 42 14.97 42H36.9956C37.9972 42 38.0128 41.1939 37.9972 40.9333C37.6065 34.3909 32.3616 31.3333 25.9778 31.3333ZM45.2746 42L40.1333 42C40.1333 38.9987 39.1417 36.2291 37.4683 34.0008C42.0103 34.0505 45.7189 36.3468 45.998 41.2C46.0092 41.3955 45.998 42 45.2746 42Z" fill="#3D42DF"/>
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col justify-center flex-wrap bg-white p-5 rounded-lg h-100'>
                            <p className='text-gray-500 font-semibold w-full mb-5'>Total Tutors Count</p>
                            <div className='flex flex-row items-center justify-between'>
                                <h2 className='text-2xl w-1/2 font-bold'>{tutors}</h2>
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="60" height="60" rx="20" fill="#DADADA"/>
                                <path d="M20.625 18.75C20.625 16.6816 22.3066 15 24.375 15H45C47.0684 15 48.75 16.6816 48.75 18.75V35.625C48.75 37.6934 47.0684 39.375 45 39.375H30.9844C30.293 37.8809 29.2324 36.5918 27.9141 35.625H33.75V33.75C33.75 32.7129 34.5879 31.875 35.625 31.875H39.375C40.4121 31.875 41.25 32.7129 41.25 33.75V35.625H45V18.75H24.375V21.627C23.2734 20.9883 21.9902 20.625 20.625 20.625V18.75ZM20.625 22.5C21.3637 22.5 22.0951 22.6455 22.7776 22.9282C23.4601 23.2109 24.0801 23.6252 24.6025 24.1475C25.1248 24.6699 25.5391 25.2899 25.8218 25.9724C26.1045 26.6549 26.25 27.3863 26.25 28.125C26.25 28.8637 26.1045 29.5951 25.8218 30.2776C25.5391 30.9601 25.1248 31.5801 24.6025 32.1025C24.0801 32.6248 23.4601 33.0391 22.7776 33.3218C22.0951 33.6045 21.3637 33.75 20.625 33.75C19.8863 33.75 19.1549 33.6045 18.4724 33.3218C17.7899 33.0391 17.1699 32.6248 16.6475 32.1025C16.1252 31.5801 15.7109 30.9601 15.4282 30.2776C15.1455 29.5951 15 28.8637 15 28.125C15 27.3863 15.1455 26.6549 15.4282 25.9724C15.7109 25.2899 16.1252 24.6699 16.6475 24.1475C17.1699 23.6252 17.7899 23.2109 18.4724 22.9282C19.1549 22.6455 19.8863 22.5 20.625 22.5ZM19.0605 35.625H22.1836C26.502 35.625 30 39.123 30 43.4355C30 44.2969 29.3027 45 28.4355 45H12.8145C11.9473 45 11.25 44.3027 11.25 43.4355C11.25 39.123 14.748 35.625 19.0605 35.625Z" fill="#3D42DF"/>
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col justify-center flex-wrap bg-white p-5 rounded-lg h-100'>
                            <p className='text-gray-500 font-semibold w-full mb-5'>Total Admin Count</p>
                            <div className='flex flex-row items-center justify-between'>
                                <h2 className='text-2xl w-1/2 font-bold'>{admins}</h2>
                                <svg width="60" className='w-1/2 flex justify-end' height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="60" height="60" rx="20" fill="#DADADA"/>
                                <path opacity="0.587821" fill-rule="evenodd" clip-rule="evenodd" d="M20.6665 23.3333C20.6665 26.2789 23.0543 28.6667 25.9998 28.6667C28.9454 28.6667 31.3332 26.2789 31.3332 23.3333C31.3332 20.3878 28.9454 18 25.9998 18C23.0543 18 20.6665 20.3878 20.6665 23.3333ZM33.9998 28.6667C33.9998 30.8758 35.7907 32.6667 37.9998 32.6667C40.209 32.6667 41.9998 30.8758 41.9998 28.6667C41.9998 26.4575 40.209 24.6667 37.9998 24.6667C35.7907 24.6667 33.9998 26.4575 33.9998 28.6667Z" fill="#3D42DF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9778 31.3333C19.6826 31.3333 14.5177 34.5687 14.0009 40.9323C13.9727 41.2789 14.6356 42 14.97 42H36.9956C37.9972 42 38.0128 41.1939 37.9972 40.9333C37.6065 34.3909 32.3616 31.3333 25.9778 31.3333ZM45.2746 42L40.1333 42C40.1333 38.9987 39.1417 36.2291 37.4683 34.0008C42.0103 34.0505 45.7189 36.3468 45.998 41.2C46.0092 41.3955 45.998 42 45.2746 42Z" fill="#3D42DF"/>
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col justify-center flex-wrap bg-white p-5 rounded-lg h-100'>
                            <p className='text-gray-500 font-semibold w-full mb-5'>Total Courses Count</p>
                            <div className='flex flex-row items-center justify-between'>
                                <h2 className='text-2xl w-1/2 font-bold'>{courses}</h2>
                                <svg width="60" className='w-1/4' height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="60" height="60" rx="20" fill="#DADADA"/>
                                <path opacity="0.587821" fill-rule="evenodd" clip-rule="evenodd" d="M20.6665 23.3333C20.6665 26.2789 23.0543 28.6667 25.9998 28.6667C28.9454 28.6667 31.3332 26.2789 31.3332 23.3333C31.3332 20.3878 28.9454 18 25.9998 18C23.0543 18 20.6665 20.3878 20.6665 23.3333ZM33.9998 28.6667C33.9998 30.8758 35.7907 32.6667 37.9998 32.6667C40.209 32.6667 41.9998 30.8758 41.9998 28.6667C41.9998 26.4575 40.209 24.6667 37.9998 24.6667C35.7907 24.6667 33.9998 26.4575 33.9998 28.6667Z" fill="#3D42DF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9778 31.3333C19.6826 31.3333 14.5177 34.5687 14.0009 40.9323C13.9727 41.2789 14.6356 42 14.97 42H36.9956C37.9972 42 38.0128 41.1939 37.9972 40.9333C37.6065 34.3909 32.3616 31.3333 25.9778 31.3333ZM45.2746 42L40.1333 42C40.1333 38.9987 39.1417 36.2291 37.4683 34.0008C42.0103 34.0505 45.7189 36.3468 45.998 41.2C46.0092 41.3955 45.998 42 45.2746 42Z" fill="#3D42DF"/>
                                </svg>
                            </div>
                        </div>
                        
                    </div>

                    
                </div>
            </div>
        </AdminLayout>
    );
}
