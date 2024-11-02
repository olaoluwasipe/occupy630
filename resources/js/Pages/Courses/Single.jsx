import React, {useState} from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import ProfilePhoto from '@/Components/ProfilePhoto'
import Accordion from '@/Components/Accordion'
import Tabs from '@/Components/Tabs'
import CourseModules from '@/Content/CourseModules'
import Assignments from '@/Content/Assignments'
import Activities from '@/Content/Activities'
import Meetings from '@/Content/Meetings'
import Forum from '@/Content/Forum'
import Files from '@/Content/Files'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton'
import AssignmentAddForm from '@/Forms/AssignmentAddForm'
import ScheduleAddForm from '@/Forms/ScheduleAddForm'
import FileAddForm from '@/Forms/FileAddForm'
import parse from 'html-react-parser'

const Single = ({auth, course}) => {

    const [openAssignment, setOpenAssignment] = useState(false);

    const [openMeeting, setOpenMeeting] = useState(false)

    const [openFile, setOpenFile] = useState(false)

    const modalOpen = () => {
        setOpenAssignment(!openAssignment);
    }

    const modalMeet = () => {
        setOpenMeeting(!openMeeting);
    }

    const modalFile = () => {
        setOpenFile(!openFile);
    }

    console.log(course)

  const tabsData = [
    {
      label: 'Recent Activities',
      content: <Activities activities={course.cohorts[0].activities} />
    },
    {
      label: 'Course Modules',
      content: <CourseModules modules={course.modules} />
    },
    {
        label: 'Assignments',
        content: <Assignments openAssignment={() => setOpenAssignment(!openAssignment)} action={auth.user.type === 'tutor' ? true : false} tutor={course.cohorts[0].tutor} assignments={course.cohorts[0].assignments} />
    },
    {
        label: 'Meetings',
        content: <Meetings students={course.cohorts[0].students} course={course.title} openMeeting={() => setOpenMeeting(!openMeeting)} action={auth.user.type === 'tutor' ? true : false} meetings={course.cohorts[0].meetings} />
    },
    {
        label: 'Forum',
        content: <Forum forums={course.cohorts[0].forums} cohort={course.cohorts[0].id} />
    },
    {
        label: 'Files & Resources',
        content: <Files openFile={() => setOpenFile(!openFile)} files={course.cohorts[0].files} />
    },
  ];
  return (
    <AuthenticatedLayout
    user={auth.user}>

        <Head title={course.title} />
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
                                    <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">My Courses</a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.82364 6.17636C8.27919 6.63191 8.27919 7.37173 7.82364 7.82728L1.99258 13.6583C1.53703 14.1139 0.797215 14.1139 0.341663 13.6583C-0.113888 13.2028 -0.113888 12.463 0.341663 12.0074L5.34908 7L0.345308 1.99258C-0.110243 1.53703 -0.110243 0.797215 0.345308 0.341663C0.800859 -0.113888 1.54067 -0.113888 1.99622 0.341663L7.82728 6.17272L7.82364 6.17636Z" fill="#717171"/>
                                    </svg>
                                    <a href="#" className="ml-4 text-sm font-medium text-green-500 hover:text-green-700">{course.title}</a>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white flex-wrap overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center justify-between p-6">
                        <div className='w-1/2 flex flex-row gap-3 mb-10 items-center'>
                            <div className='flex flex-col'>
                                <h2 className='text-2xl font-bold text-blue-900'>{course.title}</h2>
                            </div>
                        </div>
                        <div className='w-1/2 flex flex-row gap-3 mb-10 items-center justify-end'>
                            <ProfilePhoto style='w-10' user={course.cohorts[0].tutor} />
                            <p className='font-bold'>{course.cohorts[0].tutor.name} | <span className='text-green-700'>Tutor</span></p>
                        </div>
                        <Accordion title="Course Description" style="mb-5" opened={true} content={course.description} />
                        <Accordion title="Course Objective" content={parse(course.objectives)} />
                    </div>

                    <div className="container mx-auto mt-12">
                        <Tabs tabs={tabsData} />
                    </div>


                </div>
            </div>

            <Modal show={openAssignment}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Create Assignment</p>
                        <DangerButton onClick={modalOpen}>Close</DangerButton>
                    </div>

                    <AssignmentAddForm cohort={course.cohorts[0].id} />
                </div>
            </Modal>

            <Modal show={openMeeting}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Create Schedule</p>
                        <DangerButton onClick={modalMeet}>Close</DangerButton>
                    </div>

                    <ScheduleAddForm cohort={course.cohorts[0].id} />
                </div>
            </Modal>

            <Modal show={openFile}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Upload File</p>
                        <DangerButton onClick={modalFile}>Close</DangerButton>
                    </div>

                    <FileAddForm cohort={course.cohorts[0].id} />
                </div>
            </Modal>
    </AuthenticatedLayout>
  )
}

export default Single
