import React, {useEffect} from 'react'
import Accordion from '@/Components/Accordion'
import parse from 'html-react-parser'
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel'
import EditorComponent from '@/Components/Editor'
import InputError from '@/Components/InputError'
import TextInput from '@/Components/TextInput'
import Files from '@/Content/Files'
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

const GradeSubmission = ( {submission, closeGrade} ) => {
    const { data, setData, reset, patch, processing, errors, recentlySuccessful } = useForm({
        tutor_feedback: submission.tutor_feedback ?? '',
        grade: submission.grade ?? '',
        submission_id: submission.id
    });

    useEffect(() => {
        if(recentlySuccessful) {
            reset()
            closeGrade()
        }
    }, [recentlySuccessful])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)

        patch(route('submission.update', submission.id))
    }

  return (
    <form onSubmit={handleSubmit}>
        <h3 className='font-semibold'>Student Name: {submission.user.name}</h3>
        <Accordion title="Assignment Submission" style="mb-5" opened={true} content={parse(submission.text)} />
        {submission.file && (
            <Accordion title="Attachments" content={<Files files={[submission.file]} showAction={false} />} />
        )}
        <div className='mt-3'>
            <InputLabel htmlFor="remark" value="Tutor's Remark" />
            <EditorComponent value={data.tutor_feedback} onTextChange={(content) => setData('tutor_feedback', content)} />

            <InputError message={errors?.tutor_feedback} className='mt-2' />
        </div>
        <div className='mt-3'>
            <InputLabel htmlFor="grade" value="Grade" />
            <TextInput
                id="grade"
                type="number"
                max={100}
                name="grade"
                placeholder="Grade over 100"
                value={data.grade}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData('grade', e.target.value)}
            />

            <InputError message={errors?.grade} className='mt-2' />
        </div>

        <div className='mt-3'>
            <InputLabel htmlFor="student_feedback" value="Student Feedback" />
            <p>{parse(submission?.student_feedback)}</p>
        </div>

        <div className="flex items-center gap-4 mt-6">
            <PrimaryButton className='w-full flex items-center justify-center' disabled={processing}>Save</PrimaryButton>

            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-gray-600">Saved.</p>
            </Transition>
        </div>
    </form>
  )
}

export default GradeSubmission
