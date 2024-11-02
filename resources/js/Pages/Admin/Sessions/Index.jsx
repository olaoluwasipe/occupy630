import DangerButton from '@/Components/DangerButton'
import IconTextInput from '@/Components/IconTextInput'
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import Table from '@/Components/Table'
import CreateSessionForm from '@/Forms/CreateSessionForm'
import Admin from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React, {useState} from 'react'

const Sessions = ({auth, sessions, tutors, courses}) => {
    console.log(sessions)
    const [searchQuery, setSearchQuery] = useState('')
    const [session, setSession] = useState({id: 0})
    const [createSession, setCreateSession] = useState(false)
    const [deleteSession, setDeleteSession] = useState(false)
    const [editSession, setEditSession] = useState(false)

    const startEdit = (session) => {
        setEditSession(true)
        setSession(session)
        setCreateSession(true)
    }

    const modalSession = () => {
        setEditSession(false)
        setCreateSession(!createSession)
    }
    const modalDelete = () => {
        setDeleteSession(!deleteSession)
    }
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredData = sessions.filter((session) =>
        session.course.title.toLowerCase().includes(searchQuery.toLowerCase()) || session.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeSessions = filteredData.filter((session) => session.status === 'active')
    const completedSessions = filteredData.filter((session) => session.status === 'completed')
  return (
    <Admin
            user={auth.user}
            title="Session Management"
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title='Session Management' />
        
        <div className="container mx-auto mt-4">
            <div className='bg-white rounded p-4 mb-5'>
                <PrimaryButton onClick={modalSession} className='mb-4'>Create New Session</PrimaryButton>
                <IconTextInput
                    icon=<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.625 6.99905C13.625 8.43321 13.1595 9.75802 12.3752 10.8329L16.3309 14.7917C16.7215 15.1822 16.7215 15.8165 16.3309 16.2071C15.9403 16.5976 15.306 16.5976 14.9155 16.2071L10.9598 12.2483C9.88497 13.0357 8.56016 13.4981 7.126 13.4981C3.5359 13.4981 0.626953 10.5891 0.626953 6.99905C0.626953 3.40895 3.5359 0.5 7.126 0.5C10.7161 0.5 13.625 3.40895 13.625 6.99905ZM7.126 11.4984C7.71686 11.4984 8.30194 11.382 8.84782 11.1559C9.39371 10.9298 9.88971 10.5984 10.3075 10.1806C10.7253 9.76276 11.0567 9.26676 11.2828 8.72087C11.509 8.17499 11.6253 7.58991 11.6253 6.99905C11.6253 6.40819 11.509 5.82311 11.2828 5.27722C11.0567 4.73134 10.7253 4.23534 10.3075 3.81753C9.88971 3.39973 9.39371 3.06831 8.84782 2.8422C8.30194 2.61609 7.71686 2.49971 7.126 2.49971C6.53514 2.49971 5.95006 2.61609 5.40418 2.8422C4.85829 3.06831 4.36229 3.39973 3.94449 3.81753C3.52668 4.23534 3.19526 4.73134 2.96915 5.27722C2.74304 5.82311 2.62666 6.40819 2.62666 6.99905C2.62666 7.58991 2.74304 8.17499 2.96915 8.72087C3.19526 9.26676 3.52668 9.76276 3.94449 10.1806C4.36229 10.5984 4.85829 10.9298 5.40418 11.1559C5.95006 11.382 6.53514 11.4984 7.126 11.4984Z" fill="#717171"/>
                        </svg>
                    style={{borderRadious: '900px'}}
                    rounded="rounded-full"
                    className='border border-gray-400 bg-slate-50 mb-6 rounded-full'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div class="relative overflow-x-auto">
            <h2 className='text-2xl text-blue-950 mb-4 font-semibold'>Active Sessions</h2>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Students
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tutor
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                End Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {activeSessions.map ((session) => (
                        <tr class="bg-white border-b  ">
                            <td class="px-6 py-4">
                                {session.id}
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {session.course.title}
                            </th>
                            <td class="px-6 py-4">
                                {session.name}
                            </td>
                            <td class="px-6 py-4">
                                {session.students.length}
                            </td>
                            <td class="px-6 py-4">
                                {session.tutor[0].name}
                            </td>
                            <td class="px-6 py-4">
                                {session.start_date}
                            </td>
                            <td class="px-6 py-4">
                                {session.end_date}
                            </td>
                            <td>
                                <div class="flex items-center space-x-4">
                                    {/* <PrimaryButton style={{padding: "0.5rem 1rem"}} className='py-2'>View</PrimaryButton> */}
                                    <SecondaryButton onClick={() => startEdit(session)}>Edit</SecondaryButton>
                                    <DangerButton onClick={() => {modalDelete(!deleteSession); setSession(session)}}>Delete</DangerButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                        
                    </tbody>
                </table>
            </div>
            <div class="relative overflow-x-auto mt-5">
            <h2 className='text-2xl text-blue-950 mb-4 font-semibold'>Completed Sessions</h2>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Students
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tutor
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                End Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {completedSessions.map ((session) => (
                        <tr class="bg-white border-b  ">
                            <td class="px-6 py-4">
                                {session.id}
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {session.course.title}
                            </th>
                            <td class="px-6 py-4">
                                {session.name}
                            </td>
                            <td class="px-6 py-4">
                                {session.students.length}
                            </td>
                            <td class="px-6 py-4">
                                {session.tutor[0].name}
                            </td>
                            <td class="px-6 py-4">
                                {session.start_date}
                            </td>
                            <td class="px-6 py-4">
                                {session.end_date}
                            </td>
                        </tr>
                    ))}
                        
                    </tbody>
                </table>
            </div>

        </div>

        <Modal show={createSession}>
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>{editSession ? 'Update' : 'Add'} Session</p>
                    <DangerButton onClick={modalSession}>Close</DangerButton>
                </div>

                <CreateSessionForm courses={courses} session={editSession ? session : []} tutors={tutors} modalClose={() => setCreateSession(false)} />
            </div>
        </Modal>
        <Modal show={deleteSession} >
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>Are you sure you want to delete {session?.course?.title}, {session?.name} session?</p>
                    <DangerButton onClick={modalDelete}>Close</DangerButton>
                </div>
                <div className='flex flex-row items-center w-full justify-center gap-4'>
                    <SecondaryButton onClick={modalDelete}>Cancel</SecondaryButton>
                    <Link
                        href={route('admin.delete-session', session?.id)}
                        method='delete'>
                        <DangerButton 
                            onClick={() => {
                            console.log(session)
                            setTimeout(setDeleteSession(false), 2000)
                        }}>Delete</DangerButton>
                    </Link>
                </div>
            </div>
        </Modal>
    </Admin>
  )
}

export default Sessions
