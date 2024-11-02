import React, { useState, useEffect } from 'react'

const ViewAttendance = ({ modalClose, students, meeting, course, attendance }) => {
    const [dataToSend, setDataToSend] = useState(meeting.attendance || []);
    console.log(meeting.attendance)


    return (
        <div>
            <p className='font-semibold'>Course: {course}</p>
            <div className='flex items-center justify-start gap-3'>
                <div className='flex items-center border-2 border-gray-300 rounded-md'>
                    <div className='bg-gray-300 py-2 px-3'>
                        <p>Date</p>
                    </div>
                    <div className='py-2 px-3'>
                        <p>{meeting.date}</p>
                    </div>
                </div>
                <div className='flex items-center border-2 border-gray-300 rounded-md'>
                    <div className='bg-gray-300 py-2 px-3'>
                        <p>Time</p>
                    </div>
                    <div className='py-2 px-3'>
                        <p>{meeting.duration_time}</p>
                    </div>
                </div>
            </div>
            <p className='mt-3 font-semibold'>Students</p>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => {
                            let studStat = dataToSend.find(data => data.user_id === student.id)?.status;
                            return (
                            <tr key={student.id} className="bg-white border-b">
                                <td className="px-6 py-4">
                                    {student.id}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {student.name}
                                </th>
                                <td className="px-6 py-4">
                                    {student.email}
                                </td>
                                <td className="px-6 py-4">
                                    <p className={`px-4 py-1 font-semibold bg-${studStat == 'present' ? 'green' : 'red'}-300 text-${studStat == 'present' ? 'green' : 'red'}-600 capitalize`}>
                                        {studStat}
                                    </p>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>


        </div>
    )
}

export default ViewAttendance;
