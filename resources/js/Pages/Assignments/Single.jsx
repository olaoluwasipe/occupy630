import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Accordion from '@/Components/Accordion'
import parse from 'html-react-parser'
import Tabs from '@/Components/Tabs'
import Files from '@/Content/Files'
import SubmissionList from '@/Content/Submissions'
import AssignmentSubmissionForm from '@/Forms/AssignmentSubmissionForm'
import AssignmentFeedbackForm from '@/Forms/AssignmentFeedbackForm'

const Single = ({auth, assignment}) => {
    console.log(assignment)

    const assignmentFiles = assignment.files.filter((file) => file.user.type !== 'learner');

    const submissionMade = assignment.submissions.filter((submission) => submission.user_id === auth.user.id)

  const tabsData = [
    {
      label: 'All',
      content: <SubmissionList submissions={[assignment.submissions, assignment.nonSubmittedUsers]} showAll={true} />
    },
    {
      label: 'Submitted',
      content: <SubmissionList submissions={[assignment.submissions, assignment.nonSubmittedUsers]} showSubmitted={true} />
    },
    {
      label: 'Pending',
      content: <SubmissionList submissions={[assignment.submissions, assignment.nonSubmittedUsers]} showNotSubmitted={true} />
    },
  ];
  return (
    <AuthenticatedLayout
    user={auth.user}>

        <Head title={assignment.title} />
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <nav className="flex mb-4" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <a href="/" className="text-gray-500 hover:text-gray-700">

                                    <a href="/" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Home</a>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.82364 6.17636C8.27919 6.63191 8.27919 7.37173 7.82364 7.82728L1.99258 13.6583C1.53703 14.1139 0.797215 14.1139 0.341663 13.6583C-0.113888 13.2028 -0.113888 12.463 0.341663 12.0074L5.34908 7L0.345308 1.99258C-0.110243 1.53703 -0.110243 0.797215 0.345308 0.341663C0.800859 -0.113888 1.54067 -0.113888 1.99622 0.341663L7.82728 6.17272L7.82364 6.17636Z" fill="#717171"/>
                                    </svg>
                                    <a href={route('dashboard')} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Dashboard</a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.82364 6.17636C8.27919 6.63191 8.27919 7.37173 7.82364 7.82728L1.99258 13.6583C1.53703 14.1139 0.797215 14.1139 0.341663 13.6583C-0.113888 13.2028 -0.113888 12.463 0.341663 12.0074L5.34908 7L0.345308 1.99258C-0.110243 1.53703 -0.110243 0.797215 0.345308 0.341663C0.800859 -0.113888 1.54067 -0.113888 1.99622 0.341663L7.82728 6.17272L7.82364 6.17636Z" fill="#717171"/>
                                    </svg>
                                    <a href={route('course.show', assignment?.cohort.course.slug)} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{assignment.cohort.course.title}</a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.82364 6.17636C8.27919 6.63191 8.27919 7.37173 7.82364 7.82728L1.99258 13.6583C1.53703 14.1139 0.797215 14.1139 0.341663 13.6583C-0.113888 13.2028 -0.113888 12.463 0.341663 12.0074L5.34908 7L0.345308 1.99258C-0.110243 1.53703 -0.110243 0.797215 0.345308 0.341663C0.800859 -0.113888 1.54067 -0.113888 1.99622 0.341663L7.82728 6.17272L7.82364 6.17636Z" fill="#717171"/>
                                    </svg>
                                    <a href={route('assignments')} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Assignments</a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.82364 6.17636C8.27919 6.63191 8.27919 7.37173 7.82364 7.82728L1.99258 13.6583C1.53703 14.1139 0.797215 14.1139 0.341663 13.6583C-0.113888 13.2028 -0.113888 12.463 0.341663 12.0074L5.34908 7L0.345308 1.99258C-0.110243 1.53703 -0.110243 0.797215 0.345308 0.341663C0.800859 -0.113888 1.54067 -0.113888 1.99622 0.341663L7.82728 6.17272L7.82364 6.17636Z" fill="#717171"/>
                                    </svg>
                                    <a href="#" className="ml-4 text-sm font-medium text-green-500 hover:text-green-700">{assignment.title}</a>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white flex-wrap overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center justify-between p-6">
                        <div className='w-1/2 flex flex-row gap-3 mb-10 items-center'>
                            <div className='flex flex-col'>
                                <h2 className='text-2xl font-bold text-blue-900'>{assignment.title}</h2>
                            </div>
                        </div>
                        <div className='w-1/2 flex flex-row gap-3 mb-10 items-center justify-end'>
                            <p className='font-bold'><span className='text-green-700'>{assignment.status}</span></p>
                        </div>
                        <Accordion title="Assignment Description" style="mb-5" opened={true} content={parse(assignment.description)} />
                        <Accordion title="Attachments" content={<Files files={assignmentFiles} showAction={false} />} />

                        {auth.user.type === "tutor" && (
                        <div className='flex flex-row gap-3 mt-3'>
                            <p className='p-2 bg-green-200 text-green-800 rounded'>{assignment.submittedUsers.length} Submitted</p>
                            <p className='p-2 bg-red-200 text-red-800 rounded'>{assignment.nonSubmittedUsers.length} Pending</p>
                        </div>
                        )}
                    </div>

                    {auth.user.type === "tutor" ? (
                        <div className="container mx-auto mt-12">
                            <Tabs tabs={tabsData} />
                        </div>
                    ) : (
                        submissionMade.length > 0 ? (
                            <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white mt-5 flex-wrap overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center justify-between p-6">
                                <div className='bg-gray-200 p-2 rounded w-full mb-4'>
                                    <p className='font-semibold'>Submissions</p>
                                </div>

                                <div className='flex flex-row gap-8 w-full'>
                                    <div className='w-4/5'>
                                        <p className='font-semibold mb-3'>Text</p>
                                        <p>{parse(submissionMade[0].text)}</p>
                                    </div>
                                    {submissionMade[0].file && (
                                    <div className='w-1/5'>
                                        <p className='font-semibold mb-3'>File Uploaded</p>
                                        <a href={'/storage/' + submissionMade[0].file.file_path} download className='text-gray-800 text-l font-semibold'>
                                            {submissionMade[0].file.file_name}
                                        </a>
                                    </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <AssignmentSubmissionForm assignment_id={assignment.id} />
                        )
                    )}

                    {submissionMade[0]?.tutor_feedback && (
                        <>
                            <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white mt-5 flex-wrap overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center justify-between p-6">
                                <div className='bg-gray-200 p-2 rounded w-full mb-4'>
                                    <p className='font-semibold'>Grading</p>
                                </div>
                                <div className='flex flex-row gap-8 w-full'>
                                    <div className='w-4/5'>
                                        <p className='font-semibold mb-3'>Tutor's Feedback</p>
                                        <p>{parse(submissionMade[0].tutor_feedback)}</p>
                                    </div>
                                    {submissionMade[0].file && (
                                    <div className='w-1/5'>
                                        <p className='font-semibold mb-3'>Grade</p>
                                        <p>{submissionMade[0].grade}</p>
                                    </div>
                                    )}
                                </div>
                            </div>
                            {submissionMade[0].student_feedback ? (
                                <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white mt-5 flex-wrap overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center justify-between p-6">
                                    <div className='bg-gray-200 p-2 rounded w-full mb-4'>
                                        <p className='font-semibold'>Student Feedback</p>
                                    </div>
                                    <div className='flex flex-row gap-8 w-full'>
                                        <div className='w-4/5'>
                                            <p>{parse(submissionMade[0].student_feedback)}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : <AssignmentFeedbackForm assignment_id={assignment.id} /> }

                        </>
                    )}

                </div>
            </div>
    </AuthenticatedLayout>
  )
}

export default Single
