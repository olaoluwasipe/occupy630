import ProfilePhoto from '@/Components/ProfilePhoto';
import Admin from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React, {useState, useEffect} from 'react'
import { format, formatDistanceToNow } from 'date-fns';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import CreateUserForm from '@/Forms/CreateUserForm';

const ViewUser = ({auth, user}) => {
    console.log(user)

  const [submittedCount, setSubmittedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [editUser, setEditUser] = useState(false)

  const modalUser = () => {
        setEditUser(!editUser)
    }


  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();

    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(now.getFullYear() - 5);

    if (date < fiveYearsAgo) {
      return format(date, 'dd, MMM. yyyy');
    } else {
      return formatDistanceToNow(date, { addSuffix: true });
    }
  };

  useEffect(() => {
    let submitted = 0;
    let pending = 0;

    user.assignments.forEach(cohort => {
      cohort.forEach(assignment => {
        if (assignment.submissions.length > 0) {
          submitted++;
        } else {
          pending++;
        }
      });
    });

    setSubmittedCount(submitted);
    setPendingCount(pending);
    console.log(pending, submitted)
  }, [user.assignments]);

  return (
    <Admin
            user={auth.user}
            title="User Management"
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title='User Management' />

        <div className="container mx-auto mt-2 overflow-auto h-[80vh]">
          <div className='flex flex-row flex-wrap rounded-lg justify-between items-end p-6 bg-gray-600 text-white'>
            <div className='w-full flex justify-between mb-4'>
                <div></div>
                <SecondaryButton onClick={modalUser}>Edit</SecondaryButton>
            </div>
            <div className='flex gap-3 flex-row items-center'>
              <ProfilePhoto user={user} />
              <div>
                <p className='text-xl font-semibold'>{user?.name}</p>
                <p>
                    {user?.courses.map((course) => course.title).join(' | ')}
                </p>
              </div>
            </div>
            <div className='bg-green-600 p-3 rounded'>
                <p className='capitalize'>{user.type}</p>
            </div>
          </div>

          <div className='bg-white p-4'>
            <div className='bg-gray-200 p-2 rounded w-full mb-4'>
                <p className='font-semibold'>Personal Information</p>
            </div>
            <div className='grid grid-cols-2 items-center w-full justify-center gap-4'>
                <div className='border rounded border-gray-200 p-4'>
                    <p className='text-xl font-semibold'>Name</p>
                    <p>{user?.name}</p>
                </div>
                <div className='border rounded border-gray-200 p-4'>
                    <p className='text-xl font-semibold'>Gender</p>
                    <p>{user?.gender}</p>
                </div>
                <div className='border rounded border-gray-200 p-4'>
                    <p className='text-xl font-semibold'>Email</p>
                    <p>{user?.email}</p>
                </div>
                <div className='border rounded border-gray-200 p-4'>
                    <p className='text-xl font-semibold'>Phone Number</p>
                    <p>{user?.phonenumber}</p>
                </div>
                <div className='border rounded border-gray-200 p-4'>
                    <p className='text-xl font-semibold'>Nationality</p>
                    <p>{user?.nationality}</p>
                </div>
                <div className='border rounded border-gray-200 p-4'>
                    <p className='text-xl font-semibold'>Address</p>
                    <p>{user?.address}</p>
                </div>
            </div>

            {(user.type == 'learner' || user.type === 'tutor')  && (
            <>
            <div className='bg-gray-200 p-2 rounded mt-5 w-full mb-4'>
                <p className='font-semibold'>Academic Information</p>
            </div>
            <div className='grid grid-cols-2 items-center w-full justify-center gap-4'>
                <div className='border rounded border-gray-200 p-4'>
                    <p className='text-xl font-semibold'>{user.type === 'learner' ? 'Enrolled' : 'Assigned'} Courses</p>
                    <p>{user?.courses.map((course) => course.title).join(', ')}</p>
                </div>
                {user.type === 'learner'  && (
                    <>
                        <div className='border rounded border-gray-200 p-4'>
                            <p className='text-xl font-semibold'>Completed Courses</p>
                            <p>{user?.gender}</p>
                        </div>
                        <div className='border rounded border-gray-200 p-4'>
                            <p className='text-xl font-semibold'>Assignments</p>
                            <p><span className='text-green-400 font-semibold'>{submittedCount} Submitted</span>, <span className='text-red-500 font-semibold'>{pendingCount} Pending</span></p>
                        </div>
                    </>
                )}
            </div>
            </>
            )}

            <div className='bg-gray-200 p-2 rounded mt-5 w-full mb-4'>
                <p className='font-semibold'>Activity Information</p>
            </div>
            <div className='grid grid-cols-2 items-center w-full justify-center gap-4'>
                <div className='border rounded border-gray-200 p-4'>
                    <p className='text-xl font-semibold'>Last Logged In</p>
                    <p>{user?.last_logged_in ? formatTimestamp(user?.last_logged_in) : 'N/A'}</p>
                </div>
            </div>
          </div>
            <Modal show={editUser} >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>{editUser ? 'Update' : 'Add'} User</p>
                        <DangerButton onClick={modalUser}>Close</DangerButton>
                    </div>

                    <CreateUserForm courses={{}} user={editUser ? user : []} cohorts={{}} modalClose={() => setEditUser(false)} />
                </div>
            </Modal>


        </div>


    </Admin>
  )
}

export default ViewUser
