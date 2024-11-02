import { Link } from '@inertiajs/react'
import React from 'react'

const Update = ({title, duedate, course, action, actionName, actionLink, description, type, status, sideColor, onClick}) => {
  return (
    <div className={`flex flex-col justify-center px-6 bg-gray-100 border-l-4 border-l-${sideColor}-500 w-full p-3 text-center rounded-lg h-100`}>
        <div className='flex flex-row gap-3 items-center font-bold text-sm'>
            {course ?? (
                <p className='font-bold'>{course}</p>
            )}
            <p className={`p-2 bg-${sideColor}-100 rounded`}>{type}</p>
            <p className='text-red-500'>{duedate}</p>
        </div>
        <div className='flex flex-row flex-wrap justify-between items-center'>
            <div className='flex flex-col gap-3 w-3/4 text-left'>
                <p className='font-semibold'>{title}</p>
                {(description !== null || description !== '') && (
                    <p className='font-medium w-full'>{description}</p>
                )}
            </div>
        </div>
        {action && (
          <div className='flex flex-row gap-3 items-center'>
              {actionLink ? (
                <Link href={actionLink} className='p-2 bg-gray-300 rounded'>{actionName}</Link>
              ) : (
                <button onClick={onClick} className='p-2 bg-gray-300 rounded'>{actionName}</button>
              )}
          </div>
        )}
    </div>
  )
}

export default Update
