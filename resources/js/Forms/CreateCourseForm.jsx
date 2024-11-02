import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import React, { useState, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import EditorComponent from '@/Components/Editor';
import DangerButton from '@/Components/DangerButton';

const CreateCourseForm = ({course, modalClose}) => {
    // console.log(course)
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        title: course?.title || '',
        description: course?.description || '',
        objectives: course?.objectives || '',
        modules: course?.modules || [],
    });

    React.useEffect(() => {
        if (recentlySuccessful) {
            reset()
            modalClose()
        }
    }, [recentlySuccessful, reset])

    const addModule = (e) => {
        e.preventDefault()
        setData('modules', [...data.modules, { id: '', title: '', description: '' }]);
    }

    const removeModule = (e, index) => {
        e.preventDefault()
        const newModules = [...data.modules]
        newModules.splice(index, 1)
        setData('modules', newModules)
    }

    const handleModuleChange = (index, field, value) => {
        const newModules = [...data.modules];
        newModules[index][field] = value;
        setData('modules', newModules);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Title:', data.title);
        console.log('Description:', data.description);
        console.log('Objectives:', data.objectives);
        console.log('Modules:', data.modules);

        if(course.title){
            post(route('admin.update-course', course.id));
        }else{
            post(route('admin.create-course'));
        }
        // post(route('admin.create-course'));
    }

    return (
        <form className='overflow-auto max-h-[70vh]' onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('title', e.target.value)}
                />

                <InputError message={errors?.title} className='mt-2' />
            </div>
            <div className='mt-3'>
                <InputLabel htmlFor="description" value="Description" />
                <EditorComponent value={data.description} onTextChange={(content) => setData('description', content)} />

                <InputError message={errors?.description} className='mt-2' />
            </div>
            <div className='mt-3'>
                <InputLabel htmlFor="objectives" value="Objectives" />
                <EditorComponent value={data.objectives} onTextChange={(content) => setData('objectives', content)} />

                <InputError message={errors?.objectives} className='mt-2' />
            </div>
            <div className='mt-3'>
                <InputLabel htmlFor="modules" value="Modules" />
                {data.modules.map((module, index) => (
                    <div key={index} className='flex flex-col items-end gap-4'>
                        <div className='w-full'>
                            <InputLabel htmlFor={`module-title-${index}`} value="Module Title" />
                            <TextInput
                                id={`module-title-${index}`}
                                type="text"
                                name={`module-title-${index}`}
                                placeholder="Module Title"
                                value={module.title}
                                className="mt-1 block w-full"
                                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <InputLabel htmlFor={`module-description-${index}`} value="Module Description" />
                            <EditorComponent value={module.description} onTextChange={(content) => handleModuleChange(index, 'description', content)} />
                        </div>
                        <DangerButton onClick={(e) => removeModule(e, index)} className='mt-3 w-auto'>
                            Remove
                        </DangerButton>
                    </div>
                ))}
                <PrimaryButton onClick={addModule} className='mt-3'>Add Module</PrimaryButton>
            </div>

            <PrimaryButton disabled={processing} className='mt-5 w-full flex items-center justify-center gap-3' processing={processing} >
                {course ? 'Update' : 'Create'} Course
            </PrimaryButton>
        </form>
    )
}

export default CreateCourseForm
