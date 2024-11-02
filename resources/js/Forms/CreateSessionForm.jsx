import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import React, { useState, useRef } from 'react'
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const CreateSessionForm = ({ modalClose, courses, tutors, session }) => {
    const [minDate, setMinDate] = useState('');
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        course: session?.course_id || '',
        tutor: session?.tutor ? session.tutor[0]?.id : '',
        name: session?.name || '',
        startDate: session?.start_date || '',
        endDate: session?.end_date || ''
    });

    const closeModal = () => {
        modalClose()
    }

    React.useEffect(() => {
        if (recentlySuccessful) {
            reset()
            closeModal()
        }
    }, [recentlySuccessful, reset])

    function addDays(date, days) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const handleCourseChange = (e) => {
        setData('course', e.target.value)
    }

    const handleTutorChange = (e) => {
        setData('tutor', e.target.value)
    }

    const handleNameChange = (e) => {
        setData('name', e.target.value)
    }

    const handleStartDateChange = (e) => {
        const minAddDate = addDays(e.target.value, 7)
        setMinDate(minAddDate)
        console.log(minDate)
        setData('startDate', e.target.value)
    }

    const handleEndDateChange = (e) => {
        setData('endDate', e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log('Course:', data.course)
        console.log('Tutor:', data.tutor)
        console.log('Name:', data.name)
        console.log('Start Date:', data.startDate)
        console.log('End Date:', data.endDate)

        if(session.name) {
            post(route('admin.update-session', session.id))
        } else {
            post(route('admin.create-session'))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='mt-3'>
                <InputLabel htmlFor="course" value="Course" />
                <select
                    id="course"
                    name="course"
                    value={data.course}
                    className="mt-1 block w-full"
                    onChange={handleCourseChange}
                >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                </select>

                <InputError message={errors?.course} className='mt-2' />
            </div>
            <div className='mt-3'>
                <InputLabel htmlFor="tutor" value="Tutor" />
                <select
                    id="tutor"
                    name="tutor"
                    value={data.tutor}
                    className="mt-1 block w-full"
                    onChange={handleTutorChange}
                >
                    <option value="">Select Tutor</option>
                    {tutors.map((tutor) => (
                        <option key={tutor.id} value={tutor.id}>{tutor.name}</option>
                    ))}
                </select>

                <InputError message={errors?.tutor} className='mt-2' />
            </div>
            <div className='mt-3'>
                <InputLabel htmlFor="name" value="Session Name" />
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Session Name"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={handleNameChange}
                />

                <InputError message={errors?.name} className='mt-2' />
            </div>
            <div className='flex gap-3'>
                <div className='mt-3 w-1/2'>
                    <InputLabel htmlFor="startDate" value="Start Date" />
                    <TextInput
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={data.startDate}
                        className="mt-1 block w-full"
                        onChange={handleStartDateChange}
                    />

                    <InputError message={errors?.startDate} className='mt-2' />
                </div>
                <div className='mt-3 w-1/2'>
                    <InputLabel htmlFor="endDate" value="End Date" />
                    <TextInput
                        id="endDate"
                        type="date"
                        name="endDate"
                        min={minDate}
                        value={data.endDate}
                        className="mt-1 block w-full"
                        onChange={handleEndDateChange}
                    />

                    <InputError message={errors?.endDate} className='mt-2' />
                </div>
            </div>

            <PrimaryButton disabled={processing} className='mt-5 w-full flex items-center justify-center gap-3' processing={processing} >
                {session?.name ? 'Update' : 'Create'} Session
            </PrimaryButton>
        </form>
    )
}

export default CreateSessionForm
