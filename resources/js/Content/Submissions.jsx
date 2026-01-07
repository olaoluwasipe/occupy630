import React, { useState } from 'react'
import Modal from '@/Components/Modal'
import ProfilePhoto from '@/Components/ProfilePhoto'
import DangerButton from '@/Components/DangerButton'
import GradeSubmission from '@/Forms/GradeSubmission'

const SubmissionList = ({ submissions, showAll, showSubmitted, showNotSubmitted }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  const openModal = submission => {
    setSelectedSubmission(submission)
  }

  const closeModal = () => {
    setSelectedSubmission(null)
  }

  return (
    <div className='flex flex-col'>
        <h2 className='text-2xl font-semibold mb-4'>Submissions</h2>
        <ol className='flex flex-col gap-4'>
            {(showAll || showSubmitted) && submissions[0].map(submission => (
            <li key={submission.id} className='flex flex-row gap-3 list-none items-center' onClick={() => openModal(submission)}>
                <ProfilePhoto style='w-16 h-16' user={submission.user} />
                <div className='flex flex-col gap-2'>
                    <p className='font-semibold'> {submission.user.name} </p>
                    <p className='p-2 bg-green-200 text-green-800 rounded text-xs'>Submitted</p>
                </div>
            </li>
            ))}
            {(showAll || showNotSubmitted) && submissions[1]?.map(submission => (
            <li key={submission.id} className='flex flex-row gap-3 list-none'>
                <ProfilePhoto style='w-16 h-16' user={submission} />
                <div className='flex flex-col gap-2'>
                    <p className='font-semibold'> {submission.name} </p>
                    <p className='p-2 bg-red-200 text-red-800 rounded text-xs'>Pending</p>
                </div>
            </li>
            ))}

        </ol>
      <Modal
        show={!!selectedSubmission}
      >
        {selectedSubmission && (
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>Create Assignment</p>
                    <DangerButton onClick={closeModal}>Close</DangerButton>
                </div>
                <div className='flex flex-col gap-3'>
                    <GradeSubmission closeGrade={() => setSelectedSubmission(false)} submission={selectedSubmission} />
                </div>
            </div>
        )}
      </Modal>
    </div>
  )
}

export default SubmissionList
