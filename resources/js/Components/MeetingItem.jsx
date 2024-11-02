import { Link } from '@inertiajs/react'
import React from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

const MeetingItem = ({title, duedate, course, action, attendance, actionName, tutor, attendanceOpen, actionLink, description, type, status, sideColor, onClick}) => {
  return (
    <div className={`flex justify-center px-6 bg-gray-100 border-l-4 border-l-${sideColor}-500 w-full p-6 text-center rounded-lg h-100`}>
        <div className={`flex flex-1 flex-col justify-center text-center rounded-lg h-100`}>
            <div className='flex flex-row gap-3 items-center font-bold text-sm'>
                {course ?? (
                    <p className='font-bold'>{course}</p>
                )}
                <p className={`p-2 bg-${sideColor}-100 rounded`}>{type}</p>
                <p className='text-red-500'>{duedate}</p>
            </div>
            <div className='flex flex-row flex-wrap justify-between items-center'>
                <div className='flex flex-col gap-3 w-3/4 text-left'>
                    <p className='font-semibold'>{title}</p>
                    {(description !== null || description !== '') && (
                        <p className='font-medium w-full text-nowrap'>{description}</p>
                    )}
                </div>
            </div>
            {action && (
            <div className='flex flex-row gap-3 items-center'>
                {actionLink ? (
                    <Link href={actionLink} className='p-2 bg-gray-300 rounded'>{actionName}</Link>
                ) : (
                    <button onClick={onClick} className='p-2 bg-gray-300 rounded'>{actionName}</button>
                )}
            </div>
            )}
        </div>
        <div className='flex flex-col justify-center'>
            {attendance.length < 1 ? (
                <>
                    <p className='font-semibold'>Attendance not taken</p>
                    {tutor && (
                        <PrimaryButton onClick={() => attendanceOpen()} style={{padding: '0.5rem'}} className='text-center p-0 py-2  flex justify-center'>Take Attendance</PrimaryButton>
                    )}
                </>
            ) : (
                <>
                <div className='flex gap-3'>
                    <div className='flex flex-col items-center'>
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.5597 0.939384C21.1455 1.52523 21.1455 2.47664 20.5597 3.06249L8.56155 15.0606C7.97571 15.6465 7.02429 15.6465 6.43845 15.0606L0.439384 9.06155C-0.146461 8.47571 -0.146461 7.52429 0.439384 6.93845C1.02523 6.3526 1.97664 6.3526 2.56249 6.93845L7.50234 11.8736L18.4413 0.939384C19.0271 0.353539 19.9785 0.353539 20.5644 0.939384H20.5597Z" fill="#14903F"/>
                        </svg>
                        <p className='text-green-600'>{attendance?.filter((attend) => attend.status === 'present').length} Present</p>
                    </div>
                    <svg width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="0.5" width="2" height="41" rx="1" fill="#555555"/>
                    </svg>
                    <div className='flex flex-col items-center'>
                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5561 3.06169C15.1417 2.47603 15.1417 1.52491 14.5561 0.939247C13.9704 0.353584 13.0193 0.353584 12.4336 0.939247L7.5 5.87756L2.56169 0.943932C1.97603 0.358269 1.02491 0.358269 0.439247 0.943932C-0.146416 1.5296 -0.146416 2.48071 0.439247 3.06637L5.37756 8L0.443933 12.9383C-0.14173 13.524 -0.14173 14.4751 0.443933 15.0608C1.0296 15.6464 1.98071 15.6464 2.56638 15.0608L7.5 10.1224L12.4383 15.0561C13.024 15.6417 13.9751 15.6417 14.5608 15.0561C15.1464 14.4704 15.1464 13.5193 14.5608 12.9336L9.62244 8L14.5561 3.06169Z" fill="#F30000"/>
                        </svg>
                        <p className='text-red-600'>{attendance?.filter((attend) => attend.status === 'absent').length} Absent</p>
                    </div>
                </div>
                <SecondaryButton onClick={() => attendanceOpen()} className='text-center flex justify-center'>View Attendance</SecondaryButton>
                </>
            )}
            
        </div>
    </div>
  )
}

export default MeetingItem
