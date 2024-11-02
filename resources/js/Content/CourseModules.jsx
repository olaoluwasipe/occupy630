import Accordion from '@/Components/Accordion'
import React from 'react'
import parse from 'html-react-parser'

const CourseModules = ({modules}) => {
  return (
    <div className='flex flex-col gap-3'>
        <h4 className='font-medium'>Course Modules</h4>
        {modules.map((module, i) => (
            <Accordion key={i} title={module.title} content={parse(module.description)} contentStyle='p-6 py-6' style='bg-white font-normal' />
        ))}
    </div>
  )
}

export default CourseModules
