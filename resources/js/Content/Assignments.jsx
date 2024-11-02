import PrimaryButton from '@/Components/PrimaryButton'
import ProfilePhoto from '@/Components/ProfilePhoto'
import Update from '@/Components/Update'
import { Link } from '@inertiajs/react'
import React, { useState, useEffect } from 'react'

const Assignments = ({assignments, tutor, action=false, openAssignment = null}) => {
  const [assignment, setAssignment] = useState(null)

  const fixDate = (dateString) => {
    const oldate = new Date(dateString).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    return oldate
  }

  return (
    <div className='flex flex-col gap-5'>
      {assignment === null ? (
        <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
            <h4 className='font-medium'>Assignments</h4>
            {action && (
                <PrimaryButton onClick={openAssignment} className='bg-gray-600 flex items-center gap-2 capitalize'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 13.3333V2.66667C4 1.19583 5.19583 0 6.66667 0H17.3333C18.8042 0 20 1.19583 20 2.66667V10.8958C20 11.6042 19.7208 12.2833 19.2208 12.7833L16.7833 15.2208C16.2833 15.7208 15.6042 16 14.8958 16H6.66667C5.19583 16 4 14.8042 4 13.3333ZM11.3333 4C10.9667 4 10.6667 4.3 10.6667 4.66667V6.66667H8.66667C8.3 6.66667 8 6.96667 8 7.33333V8.66667C8 9.03333 8.3 9.33333 8.66667 9.33333H10.6667V11.3333C10.6667 11.7 10.9667 12 11.3333 12H12.6667C13.0333 12 13.3333 11.7 13.3333 11.3333V9.33333H15.3333C15.7 9.33333 16 9.03333 16 8.66667V7.33333C16 6.96667 15.7 6.66667 15.3333 6.66667H13.3333V4.66667C13.3333 4.3 13.0333 4 12.6667 4H11.3333ZM12.3333 18C12.8875 18 13.3333 18.4458 13.3333 19C13.3333 19.5542 12.8875 20 12.3333 20H5.66667C2.5375 20 0 17.4625 0 14.3333V5C0 4.44583 0.445833 4 1 4C1.55417 4 2 4.44583 2 5V14.3333C2 16.3583 3.64167 18 5.66667 18H12.3333Z" fill="white"/>
                    </svg>
                    Create Assignment
                </PrimaryButton>
            )}
        </div>
          {assignments.map((assignment, i) => (
            <Update
              key={i}
              title={assignment.title}
              duedate={assignment.status}
              action={true}
              onClick={() => setAssignment(assignment)}  // Pass function here
              actionName="Open Assignment"
              type="Assignment"
              status="Pending"
              contentStyle='p-6 py-6'
              sideColor={`red`}
              style='bg-white font-normal'
            />
          ))}
        </div>
      ) : (
            <div>
                <div onClick={() => setAssignment(null)} className="flex flex-row gap-3 cursor-pointer bg-gray-200 items-center p-2 mb-3">
                  <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.351398 5.6529C-0.117133 6.12143 -0.117133 6.88232 0.351398 7.35085L5.14915 12.1486C5.61768 12.6171 6.37857 12.6171 6.8471 12.1486C7.31563 11.6801 7.31563 10.9192 6.8471 10.4506L4.09589 7.69944H17.9906C18.6541 7.69944 19.1901 7.16344 19.1901 6.5C19.1901 5.83656 18.6541 5.30056 17.9906 5.30056H4.09589L6.8471 2.54935C7.31563 2.08082 7.31563 1.31993 6.8471 0.851398C6.37857 0.382867 5.61768 0.382867 5.14915 0.851398L0.351398 5.64915V5.6529Z" fill="black"/>
                  </svg>
                  <p className='font-medium text-sm'>back to assignments</p>
                </div>
              <div className='flex flex-row justify-between'>
                <p>Assignment</p>
                <div className='w-1/2 flex flex-row gap-3 items-center justify-end'>
                    <ProfilePhoto style='w-10' user={tutor} />
                    <p className='font-bold'>{tutor.name} | <span className='text-green-700'>Tutor</span></p>
                </div>
              </div>
              <div className='flex flex-row gap-2 items-center'>
                <Link href={route('assignment.show', assignment.id)}>
                    <p className='text-2xl font-semibold'>{assignment.title}</p>
                </Link>
                <p className={`p-2 bg-red-100 text-red-900 rounded`}>{assignment.status}</p>
              </div>
              <div className='flex flex-row gap-3'>
                <p className='text-gray-500 text-sm'>Posted on: <span className='font-semibold'>{fixDate(assignment.created_at)}</span></p>
                <p className='text-gray-500 text-sm'>Due on: <span className='font-semibold'>{fixDate(assignment.due_date)}</span></p>
              </div>
            </div>
        )}
    </div>
  )
}

export default Assignments
