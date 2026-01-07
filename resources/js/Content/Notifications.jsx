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
import { FaSearch } from 'react-icons/fa'

const Notifications = ({notifications}) => {
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

    function formatDate(dateString) {
        const date = new Date(dateString);

        // Get components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour time to 12-hour time
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const strTime = hours + ':' + minutes + ' ' + ampm;

        return `${strTime}, ${year}-${month}-${day}`;
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
    const filteredData = notifications.filter((notification) =>
        notification.notifiable.cohort.course.title.toLowerCase().includes(searchQuery.toLowerCase()) || JSON.parse(notification.data).message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <div>
        <div className="container mx-auto">
            <div className='bg-white rounded p-4 mb-5'>
                {/* <PrimaryButton onClick={modalSession} className='mb-4'>Send New Notification</PrimaryButton> */}
                <IconTextInput
                    icon={<FaSearch />}
                    style={{borderRadious: '900px'}}
                    rounded="rounded-full"
                    className='border border-gray-400 bg-slate-50 mb-6 rounded-full'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Notification
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tutor
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Posted On
                            </th>
                            {/* <th scope="col" class="px-6 py-3">
                                Actions
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {filteredData.map ((notification) => (
                        <tr class="bg-white border-b  ">
                            <td class="px-6 py-4">
                                {JSON.parse(notification.data).message}
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {notification.notifiable.cohort.course.title}
                            </th>
                            <td class="px-6 py-4">
                                {notification.notifiable.cohort.tutor[0].name}
                            </td>
                            <td class="px-6 py-4">
                                {formatDate(notification.created_at)}
                            </td>
                            {/* <td>
                                <div class="flex items-center space-x-4">
                                    <SecondaryButton onClick={() => startEdit(notification)}>Edit</SecondaryButton>
                                    <DangerButton onClick={() => {modalDelete(!deleteSession); setSession(session)}}>Delete</DangerButton>
                                </div>
                            </td> */}
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
            </div>

        {/* <Modal show={createSession}>
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
        </Modal> */}
    </div>
  )
}

export default Notifications
