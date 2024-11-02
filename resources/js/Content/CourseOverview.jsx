import Accordion from '@/Components/Accordion'
import React from 'react'
import parse from 'html-react-parser'

const CourseOverview = ({modules, description, objectives}) => {
  return (
    <div className='flex flex-col gap-3'>
        <div className='border rounded p-2'>
            <h4 className='font-semibold mb-4 text-xl'>Course Description</h4>
            <p>{parse(description)}</p>
        </div>
        <div className='border rounded p-2'>
            <h4 className='font-semibold mb-4 text-xl'>Course Objectives</h4>
            <p>{parse(objectives)}</p>
        </div>
        <div className='border rounded p-2'>
            <h4 className='font-semibold mb-4 text-xl'>Course Modules</h4>
            {modules.map((module, i) => (
                <Accordion key={i} title={module.title} content={parse(module.description)} contentStyle='p-6 py-6' style='bg-white font-normal' />
            ))}
        </div>
    </div>
  )
}

export default CourseOverview
