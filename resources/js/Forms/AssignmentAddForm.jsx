import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import React, { useState, useRef } from 'react'
import { Head, Link, useForm } from '@inertiajs/react';
import EditorComponent from '@/Components/Editor';
import PrimaryButton from '@/Components/PrimaryButton';

const AssignmentAddForm = ({ cohort }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        attachments: '',
        dueDate: '',
        cohort_id: cohort
    });

  const handleTitleChange = (e) => {
    setData('title', e.target.value)
  }

  const handleDescriptionChange = (content) => {
    setData('description', content)
  }

  const handleAttachmentsChange = (e) => {
    setData('attachments', e.target.files)
  }

  const handleDueDateChange = (e) => {
    setData('dueDate', e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Title:', data.title)
    console.log('Cohort:', data.cohort_id)
    console.log('Description:', data.description)
    console.log('Attachments:', data.attachments)
    console.log('Due Date:', data.dueDate)

    post(route('assignment.store'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel htmlFor="title" value="Assignment Title" />
        <TextInput
            id="title"
            type="text"
            name="title"
            placeholder="Assignment Title"
            value={data.title}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={handleTitleChange}
        />

        <InputError message={errors?.title} className='mt-2' />
      </div>
      <div className='mt-3'>
        <InputLabel htmlFor="description" value="Assignment Description" />
        <EditorComponent value={data.description} onTextChange={handleDescriptionChange} />

        <InputError message={errors?.description} className='mt-2' />
      </div>
      <div className='flex flex-row items-center gap-3 mt-3'>
        <div className='mt-3 w-1/2'>
            <InputLabel htmlFor="attachments" value="Attachments" />
            <TextInput
                id="attachments"
                type="file"
                name="attachments"
                multiple
                placeholder="Assignment Attachments"
                // value={data.attachment}
                className="mt-1 block w-full"
                onChange={handleAttachmentsChange}
            />

            <InputError message={errors?.title} className='mt-2' />
        </div>
        <div className='mt-3 w-1/2'>
            <InputLabel htmlFor="dueDate" value="Due Date" />
            <TextInput
                id="dueDate"
                type="datetime-local"
                name="dueDate"
                placeholder="Assignment Title"
                value={data.dueDate}
                className="mt-1 block w-full"
                onChange={handleDueDateChange}
            />

            <InputError message={errors?.dueDate} className='mt-2' />
        </div>
      </div>

        <PrimaryButton className='mt-5 w-full flex items-center justify-center gap-3' processing={processing} >
            Publish Assignment
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 13C0.5 16.3152 1.81696 19.4946 4.16117 21.8388C6.50537 24.183 9.68479 25.5 13 25.5C16.3152 25.5 19.4946 24.183 21.8388 21.8388C24.183 19.4946 25.5 16.3152 25.5 13C25.5 9.68479 24.183 6.50537 21.8388 4.16117C19.4946 1.81696 16.3152 0.5 13 0.5C9.68479 0.5 6.50537 1.81696 4.16117 4.16117C1.81696 6.50537 0.5 9.68479 0.5 13ZM14.8848 7.09668L19.7627 12.3262C19.9336 12.5117 20.0312 12.751 20.0312 13C20.0312 13.249 19.9336 13.4932 19.7627 13.6738L14.8848 18.9033C14.6797 19.123 14.3916 19.25 14.0889 19.25C13.4883 19.25 13 18.7617 13 18.1611V15.3438H8.3125C7.44824 15.3438 6.75 14.6455 6.75 13.7812V12.2188C6.75 11.3545 7.44824 10.6562 8.3125 10.6562H13V7.83887C13 7.23828 13.4883 6.75 14.0889 6.75C14.3916 6.75 14.6797 6.87695 14.8848 7.09668Z" fill="white"/>
            </svg>

        </PrimaryButton>
    </form>
  )
}

export default AssignmentAddForm
