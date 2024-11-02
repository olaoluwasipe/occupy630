import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import parse from 'html-react-parser'

const Courses = ({auth, courses, newcourses}) => {
    console.log(courses)
  return (
    <AuthenticatedLayout
        user={auth.user}
    >
        <Head title="Courses" />
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
                                    <a href="#" className="ml-4 text-sm font-medium text-green-500 hover:text-green-700">Courses</a>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center p-6">
                        <div className='w-1/2 flex flex-row gap-3 items-center'>
                            <div className='flex flex-col'>
                                <h2 className='text-2xl font-bold text-blue-900'>{auth.user.type === 'learner' ? 'My Courses' : 'Courses'} </h2>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 py-12 mx-auto'>
                        <div className='actions flex flex-col gap-3 w-full items-center' >
                            <div className='grid grid-cols-3 gap-3 w-full'>
                            {courses.map((item, i) => (
                                <Link key={i} href={`/course/${item.course.slug}`} className='action flex flex-col shadow-lg items-start h-full rounded-2xl overflow-hidden justify-center'>
                                    <div className="h-1/2 course-heading flex text-white bg-gray-400 p-6 w-full flex-col gap-3">
                                        <h4 className='text-2xl font-bold'>{item.course.title}</h4>
                                        <p className='tutor text-base mb-20'>{item.tutor[0].name}</p>
                                    </div>
                                    {auth.user.type == 'learner' ? (
                                    <div className='p-6'>
                                        <p className='text-bold'>Pending tasks</p>
                                        <p className='p-2 bg-green-200 text-green-800 rounded'>Assignment due in 2 days</p>
                                        <p className='text-bold mt-3'>Scheduled meetings</p>
                                        <p className='p-2 bg-gray-200 text-gray-800 rounded'>No scheduled meetings</p>
                                    </div>
                                    ) : (
                                    <div className='p-6'>
                                        <p className='text-bold'>Number of Students</p>
                                        <p className='p-2 bg-sky-200 text-sky-800 rounded flex items-center gap-4'>
                                            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_725_161)">
                                                <path d="M2.8125 0.5C3.2269 0.5 3.62433 0.66462 3.91735 0.957646C4.21038 1.25067 4.375 1.6481 4.375 2.0625C4.375 2.4769 4.21038 2.87433 3.91735 3.16735C3.62433 3.46038 3.2269 3.625 2.8125 3.625C2.3981 3.625 2.00067 3.46038 1.70765 3.16735C1.41462 2.87433 1.25 2.4769 1.25 2.0625C1.25 1.6481 1.41462 1.25067 1.70765 0.957646C2.00067 0.66462 2.3981 0.5 2.8125 0.5ZM10 0.5C10.4144 0.5 10.8118 0.66462 11.1049 0.957646C11.3979 1.25067 11.5625 1.6481 11.5625 2.0625C11.5625 2.4769 11.3979 2.87433 11.1049 3.16735C10.8118 3.46038 10.4144 3.625 10 3.625C9.5856 3.625 9.18817 3.46038 8.89515 3.16735C8.60212 2.87433 8.4375 2.4769 8.4375 2.0625C8.4375 1.6481 8.60212 1.25067 8.89515 0.957646C9.18817 0.66462 9.5856 0.5 10 0.5ZM0 6.33398C0 5.18359 0.933594 4.25 2.08398 4.25H2.91797C3.22852 4.25 3.52344 4.31836 3.78906 4.43945C3.76367 4.58008 3.75195 4.72656 3.75195 4.875C3.75195 5.62109 4.08008 6.29102 4.59766 6.75C4.59375 6.75 4.58984 6.75 4.58398 6.75H0.416016C0.1875 6.75 0 6.5625 0 6.33398ZM7.91602 6.75C7.91211 6.75 7.9082 6.75 7.90234 6.75C8.42188 6.29102 8.74805 5.62109 8.74805 4.875C8.74805 4.72656 8.73438 4.58203 8.71094 4.43945C8.97656 4.31641 9.27148 4.25 9.58203 4.25H10.416C11.5664 4.25 12.5 5.18359 12.5 6.33398C12.5 6.56445 12.3125 6.75 12.084 6.75H7.91602ZM4.375 4.875C4.375 4.37772 4.57254 3.90081 4.92417 3.54917C5.27581 3.19754 5.75272 3 6.25 3C6.74728 3 7.22419 3.19754 7.57583 3.54917C7.92746 3.90081 8.125 4.37772 8.125 4.875C8.125 5.37228 7.92746 5.84919 7.57583 6.20083C7.22419 6.55246 6.74728 6.75 6.25 6.75C5.75272 6.75 5.27581 6.55246 4.92417 6.20083C4.57254 5.84919 4.375 5.37228 4.375 4.875ZM2.5 9.97852C2.5 8.54102 3.66602 7.375 5.10352 7.375H7.39648C8.83398 7.375 10 8.54102 10 9.97852C10 10.2656 9.76758 10.5 9.47852 10.5H3.02148C2.73438 10.5 2.5 10.2676 2.5 9.97852Z" fill="#00A3FF"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_725_161">
                                                <rect width="12.5" height="10" fill="white" transform="translate(0 0.5)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>

                                        {item.students.length} {item.students.length > 1 ? 'Students' : 'Student'}
                                        </p>
                                        <p className='text-bold mt-3'>Scheduled meetings</p>
                                        <p className='p-2 flex items-center gap-4 bg-gray-200 text-gray-800 rounded'>
                                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_725_167)">
                                                <path d="M5 0.5C6.32608 0.5 7.59785 1.02678 8.53553 1.96447C9.47322 2.90215 10 4.17392 10 5.5C10 6.82608 9.47322 8.09785 8.53553 9.03553C7.59785 9.97322 6.32608 10.5 5 10.5C3.67392 10.5 2.40215 9.97322 1.46447 9.03553C0.526784 8.09785 0 6.82608 0 5.5C0 4.17392 0.526784 2.90215 1.46447 1.96447C2.40215 1.02678 3.67392 0.5 5 0.5ZM4.53125 2.84375V5.5C4.53125 5.65625 4.60938 5.80273 4.74023 5.89062L6.61523 7.14062C6.83008 7.28516 7.12109 7.22656 7.26562 7.00977C7.41016 6.79297 7.35156 6.50391 7.13477 6.35938L5.46875 5.25V2.84375C5.46875 2.58398 5.25977 2.375 5 2.375C4.74023 2.375 4.53125 2.58398 4.53125 2.84375Z" fill="black"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_725_167">
                                                <rect width="10" height="10" fill="white" transform="translate(0 0.5)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>

                                            No scheduled meetings
                                        </p>
                                    </div>
                                    )}
                                </Link>
                            ))}


                            </div>
                        </div>

                        {(auth.user.type === 'learner' && newcourses.length > 0) && (
                            <div className="bg-white sm:rounded-lg w-full mt-6">
                            <div className='mb-3 bg-gray-200 rounded p-4'>
                                <p className='font-bold'>Available Courses</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 items-center w-full h-full flex-wrap overflow-hidden">
                                {newcourses.map((course, i) => (
                                    <div key={i} className='flex flex-col justify-center border-4 border-gray-200 w-full p-4 text-center rounded-lg h-100'>
                                        <div className='flex flex-row gap-3 items-center justify-between font-bold text-sm'>
                                            <p className='text-xl text-start'>{course.title}</p>
                                        </div>
                                        <div className='flex flex-row gap-3 items-center'>
                                            <p className='text-sm truncate text-start w-3/4'>
                                                {parse(course.description)}
                                            </p>
                                            <a href='#' className='p-2 bg-gray-300 rounded'>Enroll Now</a>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                        )}

                    </div>
                </div>
            </div>

    </AuthenticatedLayout>
  )
}

export default Courses
