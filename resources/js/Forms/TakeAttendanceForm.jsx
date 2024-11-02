import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import React, { useState, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import PasswordInput from '@/Components/PasswordInput';
import SecondaryButton from '@/Components/SecondaryButton';
import Checkbox from '@/Components/Checkbox';

const TakeAttendanceForm = ({ modalClose, students, meeting, course, attendance }) => {
    const [dataToSend, setDataToSend] = useState(meeting.attendance || []);
    const [allChecked, setAllChecked] = useState(false);
    console.log(meeting.attendance)

    useEffect(() => {
        const transformedStudents = students.map(student => ({
            user_id: student.id,
            meeting_id: meeting.id,
            status: 'absent'
        }));
        if(dataToSend.length < 1) {
            setDataToSend(transformedStudents);
        }
    }, [students, meeting.id]);

    useEffect(() => {
        setData('attendance', dataToSend)
    }, [dataToSend])

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        attendance: ''
    });

    const closeModal = () => {
        modalClose();
    };

    const updateStudentStatus = (studentId, newStatus) => {
        setDataToSend(prevStudents =>
            prevStudents.map(student =>
                student.user_id === studentId ? { ...student, status: newStatus } : student
            )
        );
    };

    const updateAll = (val) => {
        setAllChecked(val);
        const newStatus = val ? 'present' : 'absent';
        setDataToSend(prevStudents =>
            prevStudents.map(student => ({ ...student, status: newStatus }))
        );
    };

    const handleUpdateStatus = (id) => {
        const student = dataToSend.find(stud => stud.user_id === id);
        if (student) {
            const newStatus = student.status === 'absent' ? 'present' : 'absent';
            updateStudentStatus(student.user_id, newStatus);
        }
    };

    useEffect(() => {
        if (recentlySuccessful) {
            reset();
            closeModal();
        }
    }, [recentlySuccessful, reset]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('take-attendance'));
    };

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
            <form onSubmit={handleSubmit}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <Checkbox
                                    value={allChecked}
                                    checked={allChecked}
                                    onChange={(e) => updateAll(e.target.checked)}
                                />
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="bg-white border-b">
                                <td className="px-6 py-4">
                                    <Checkbox
                                        checked={dataToSend.find(data => data.user_id === student.id)?.status === 'present'}
                                        onChange={() => handleUpdateStatus(student.id)}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    {student.id}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {student.name}
                                </th>
                                <td className="px-6 py-4">
                                    {student.email}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <PrimaryButton disabled={processing} className='mt-5 w-full flex items-center justify-center gap-3' processing={processing}>
                    {meeting.attendance?.length > 0 ? 'Update' : 'Take'} Attendance
                </PrimaryButton>
            </form>
        </div>
    )
}

export default TakeAttendanceForm;
