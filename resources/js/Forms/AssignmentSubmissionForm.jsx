import EditorComponent from '@/Components/Editor'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'

const AssignmentSubmissionForm = ({ assignment_id }) => {
    const {data, setData, post, processing, errors, reset, recentlySuccessful} = useForm({
        text: '',
        file: '',
        assignment_id: assignment_id
    })

    useEffect(() => {
      if(recentlySuccessful) {
        reset()
      }
    }, [recentlySuccessful])

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data)

        post(route('submission.store'))
    }
  return (
    <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white mt-5 flex-wrap overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg flex flex-row items-center justify-between p-6">
        <div className='bg-gray-200 p-2 rounded w-full mb-4'>
            <p className='font-semibold'>Submissions</p>
        </div>

        <div className='flex flex-row gap-8 w-full'>
            <div className='w-4/5'>
                <p className='font-semibold mb-3'>Text</p>
                <EditorComponent value={data.text} onTextChange={(content) => setData('text', content)} className='h-48' />
                
                <InputError message={errors?.text} className='mt-2' />
            </div>
            <div className='w-1/5'>
                <p className='font-semibold mb-3'>Upload a file</p>
                <TextInput
                    type='file'
                    className='mb-3'
                    name='file'
                    id="file"
                    // value={data.file}
                    placeholder='attach a file'
                    onChange = {(e) => setData('file', e.target.files )}
                />
                <InputError message={errors?.file} className='mt-2' />
                <PrimaryButton onClick={handleSubmit} disabled={processing} className='mt-5 w-full flex items-center justify-center gap-3' >
                    {processing ? 'Saving...' : 'Upload File'}
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 13C0.5 16.3152 1.81696 19.4946 4.16117 21.8388C6.50537 24.183 9.68479 25.5 13 25.5C16.3152 25.5 19.4946 24.183 21.8388 21.8388C24.183 19.4946 25.5 16.3152 25.5 13C25.5 9.68479 24.183 6.50537 21.8388 4.16117C19.4946 1.81696 16.3152 0.5 13 0.5C9.68479 0.5 6.50537 1.81696 4.16117 4.16117C1.81696 6.50537 0.5 9.68479 0.5 13ZM14.8848 7.09668L19.7627 12.3262C19.9336 12.5117 20.0312 12.751 20.0312 13C20.0312 13.249 19.9336 13.4932 19.7627 13.6738L14.8848 18.9033C14.6797 19.123 14.3916 19.25 14.0889 19.25C13.4883 19.25 13 18.7617 13 18.1611V15.3438H8.3125C7.44824 15.3438 6.75 14.6455 6.75 13.7812V12.2188C6.75 11.3545 7.44824 10.6562 8.3125 10.6562H13V7.83887C13 7.23828 13.4883 6.75 14.0889 6.75C14.3916 6.75 14.6797 6.87695 14.8848 7.09668Z" fill="white"/>
                    </svg>

                </PrimaryButton>
            </div>
        </div>
    </div>
  )
}

export default AssignmentSubmissionForm
