import PrimaryButton from '@/Components/PrimaryButton'
import MeetingItem from '@/Components/MeetingItem'
import React, { useState } from 'react'
import DangerButton from '@/Components/DangerButton'
import Modal from '@/Components/Modal'
import TakeAttendanceForm from '@/Forms/TakeAttendanceForm'
import ViewAttendance from '@/Forms/ViewAttendance'

const Meetings = ({meetings, action, openMeeting, students, course}) => {
    const [meeting, setMeeting] = useState(null)
    const [openAttendance, setOpenAttendance] = useState(false)

    const attendanceOpen = (meeting=null) => {
        setMeeting(meeting)
        setOpenAttendance(!openAttendance)
    }
  return (
    <div className='flex flex-col gap-5'>
        <div className='flex flex-row justify-between'>
            <h4 className='font-medium'>Meetings</h4>
            {action && (
                <PrimaryButton onClick={openMeeting} className='bg-green-600 flex items-center gap-2 capitalize'>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 0C6.19141 0 6.75 0.558594 6.75 1.25V2.5H11.75V1.25C11.75 0.558594 12.3086 0 13 0C13.6914 0 14.25 0.558594 14.25 1.25V2.5H16.125C17.1602 2.5 18 3.33984 18 4.375V6.25H0.5V4.375C0.5 3.33984 1.33984 2.5 2.375 2.5H4.25V1.25C4.25 0.558594 4.80859 0 5.5 0ZM0.5 7.5H18V18.125C18 19.1602 17.1602 20 16.125 20H2.375C1.33984 20 0.5 19.1602 0.5 18.125V7.5ZM3.625 10C3.28125 10 3 10.2812 3 10.625V14.375C3 14.7188 3.28125 15 3.625 15H7.375C7.71875 15 8 14.7188 8 14.375V10.625C8 10.2812 7.71875 10 7.375 10H3.625Z" fill="white"/>
                    </svg>

                    Add to Schedule
                </PrimaryButton>
            )}
        </div>
        {meetings.map((meeting, i) => (
            <MeetingItem
            key={i}
            title={meeting.description}
            duedate={meeting.date + " | " + meeting.duration_time}
            type="Meeting"
            status="Pending"
            description={meeting.link}
            attendanceOpen= {() => attendanceOpen(meeting)}
            attendance= {meeting.attendance}
            contentStyle='p-6 py-6'
            tutor = {action}
            action={true}
            actionLink = {meeting.link}
            actionName = "Join Meeting"
            sideColor={`blue`}
            style='bg-white font-normal' />
        ))}


        {action ? (
        <Modal show={openAttendance}  >
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>Take Attendance</p>
                    <DangerButton onClick={attendanceOpen}>Close</DangerButton>
                </div>

                <TakeAttendanceForm
                    course={course} 
                    meeting={meeting} 
                    students={students} 
                    modalClose={() => setOpenAttendance(false)} />
            </div>
        </Modal>
        ) : (
            <Modal show={openAttendance}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>View Attendance</p>
                        <DangerButton onClick={attendanceOpen}>Close</DangerButton>
                    </div>

                    <ViewAttendance
                        course={course} 
                        meeting={meeting} 
                        students={students} 
                        modalClose={() => setOpenAttendance(false)} />
                </div>
            </Modal>
        )}

        
    </div>
  )
}

export default Meetings
