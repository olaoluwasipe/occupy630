import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import ProfilePhoto from '@/Components/ProfilePhoto'
import Update from '@/Components/Update'

const Courses = ({auth, tasks}) => {
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
                                    <a href="#" className="ml-4 text-sm font-medium text-green-500 hover:text-green-700">Tasks</a>
                                </div>
                            </li>
                        </ol>
                    </nav>


                    <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center p-6">
                        <div className='w-1/2 flex flex-row gap-3 items-center'>
                            <div className='flex flex-col'>
                                <h2 className='text-2xl font-bold text-blue-900'>My Tasks</h2>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 py-12 mx-auto'>
                        <div className='actions flex flex-col gap-3 w-full items-center' >
                            <div className='flex flex-col gap-3 w-full'>
                                {tasks.map((task, i) => (
                                    <Update
                                        key={i}
                                        title={task.title}
                                        duedate={task.due_date || task.date}
                                        action={true}
                                        actionName={`Open ${task.due_date ? 'Assignment' : 'Meeting'}`}
                                        actionLink={task.due_date ? 'assignments/' + task.id : task.link}
                                        type={task.due_date ? 'Assignment' : 'Meeting'}
                                        contentStyle='p-6 py-6'
                                        sideColor={task.due_date ? 'red' : 'blue'}
                                        course={task.cohort.course.title}
                                    />
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
