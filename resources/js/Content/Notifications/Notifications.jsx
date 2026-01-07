import DangerButton from '@/Components/DangerButton'
import IconTextInput from '@/Components/IconTextInput'
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import Table from '@/Components/Table'
import CreateSessionForm from '@/Forms/CreateSessionForm'
import Admin from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React, {useState, useEffect} from 'react'
import { FaSearch } from 'react-icons/fa'

const Notifications = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [notifications, setNotifications] = useState([])
    const [session, setSession] = useState({id: 0})
    const [createSession, setCreateSession] = useState(false)
    const [deleteSession, setDeleteSession] = useState(false)
    const [editSession, setEditSession] = useState(false)

    useEffect(() => {
        const fetchedNotifications = async () => {
            try {
                const response = await fetch('/notifications');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNotifications(data.data);
                // const lastMessages = groupMessages(data);/
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        const intervalId = setInterval(fetchedNotifications, 1000);

        return () => clearInterval(intervalId);
    }, []);

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
    const filteredData = notifications?.filter((notification) =>
        notification.notifiable.name.toLowerCase().includes(searchQuery.toLowerCase()) || notification.data.message.toLowerCase().includes(searchQuery.toLowerCase())
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
                    className='border border-gray-400 bg-slate-50 mb-2 rounded-full'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="relative overflow-x-auto">

                    {filteredData?.map ((notification) => (
                        <div className={`${notification.read_at == null ? 'bg-white' : 'bg-gray-300'} cursor-pointer relative hover:bg-gray-200 transition animate px-6 py-4 border-b`}>
                            <div className=" text-md font-semibold text-gray-900">
                                {notification.data.message}
                            </div>
                            <div className="py-4 text-sm text-gray-500">
                                {formatDate(notification.created_at)}
                            </div>
                            {notification.read_at == null && <span className="bg-red-600 rounded-full block right-5 top-[40%] absolute w-5 h-5"></span>}
                            {/* <span className="bg-green-600 rounded-full block right-5 top-[40%] absolute w-5 h-5"></span> */}
                            {/* <td>
                                <div class="flex items-center space-x-4">
                                    <SecondaryButton onClick={() => startEdit(notification)}>Edit</SecondaryButton>
                                    <DangerButton onClick={() => {modalDelete(!deleteSession); setSession(session)}}>Delete</DangerButton>
                                </div>
                            </td> */}
                        </div>
                    ))}
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
