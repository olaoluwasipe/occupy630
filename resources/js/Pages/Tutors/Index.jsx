import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import ProfilePhoto from '@/Components/ProfilePhoto'

const Courses = ({auth, tutors}) => {
    console.log(tutors)
  return (
    <AuthenticatedLayout
        user={auth.user}
    >
        <Head title="Tutors" />

        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <nav className="flex mb-4" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gray-700">

                                    <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Home</a>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.82364 6.17636C8.27919 6.63191 8.27919 7.37173 7.82364 7.82728L1.99258 13.6583C1.53703 14.1139 0.797215 14.1139 0.341663 13.6583C-0.113888 13.2028 -0.113888 12.463 0.341663 12.0074L5.34908 7L0.345308 1.99258C-0.110243 1.53703 -0.110243 0.797215 0.345308 0.341663C0.800859 -0.113888 1.54067 -0.113888 1.99622 0.341663L7.82728 6.17272L7.82364 6.17636Z" fill="#717171"/>
                                    </svg>
                                    <a href="#" className="ml-4 text-sm font-medium text-green-500 hover:text-green-700">Tutors</a>
                                </div>
                            </li>
                        </ol>
                    </nav>


                    <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center p-6">
                        <div className='w-1/2 flex flex-row gap-3 items-center'>
                            <div className='flex flex-col'>
                                <h2 className='text-2xl font-bold text-blue-900'>My Tutors</h2>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 py-12 mx-auto'>
                        <div className='actions flex flex-col gap-3 w-full items-center' >
                            <div className='flex flex-col gap-3 w-full'>
                                {tutors.map((item, i) => (
                                    <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center p-6">
                                        <div className='w-1/2 flex flex-row gap-3 items-center'>
                                            <ProfilePhoto user={item.tutor[0]} />
                                            <div className='flex flex-col'>
                                                <h2 className='text-2xl font-bold text-blue-900'>{item.tutor[0].name}</h2>
                                                <div className='flex'> <p className='text-green-800 font-bold w-auto'>{item.tutor[0].type || 'Tutor'} </p> | {item.tutor[0].email}</div>
                                                <div className='flex flex-row gap-2'><p className="font-bold">Courses Taught:</p> <a href={`/course/${item.course.slug}`} className='text-green-800 underline'>{item.course.title}</a></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-3 items-center justify-end w-1/2 h-full">
                                            <button className='flex flex-row justify-center gap-2 items-center bg-blue-900 w-1/2 p-3 text-center rounded-lg h-100'>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.5661 0.175083C15.8817 0.393788 16.0473 0.771834 15.9879 1.14988L13.9883 14.1472C13.9415 14.4502 13.7571 14.7158 13.4884 14.8658C13.2198 15.0158 12.8979 15.0345 12.6136 14.9158L8.8769 13.363L6.73672 15.6781C6.45866 15.9812 6.02125 16.0812 5.63695 15.9312C5.25266 15.7812 5.00271 15.4094 5.00271 14.997V12.3851C5.00271 12.2601 5.04957 12.1414 5.13393 12.0507L10.3703 6.33631C10.5516 6.13947 10.5453 5.83641 10.3578 5.64895C10.1704 5.46149 9.86732 5.44899 9.67049 5.62708L3.31556 11.2728L0.556754 9.89182C0.225572 9.72623 0.0131164 9.39505 0.00374339 9.02637C-0.00562967 8.6577 0.18808 8.31402 0.506764 8.12968L14.5039 0.131342C14.8382 -0.0592432 15.2506 -0.0404971 15.5661 0.175083Z" fill="white"/>
                                                </svg>
                                                <p className='text-white'>Send Message</p>
                                            </button>
                                        </div>
                                    </div>

                                ))}     
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </AuthenticatedLayout>
  )
}

export default Courses
