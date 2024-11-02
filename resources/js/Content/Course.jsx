import PrimaryButton from '@/Components/PrimaryButton'
import React from 'react'
import Activities from './Activities';
import Assignments from './Assignments';
import Meetings from './Meetings';
import Forum from './Forum';
import Files from './Files';
import Tabs from '@/Components/Tabs';
import CourseOverview from './CourseOverview';
import Table from '@/Components/Table';

const CourseContent = ({ course, editButton }) => {
    console.log(course)
  const tabsData = [
    {
      label: 'Overview',
      content: <CourseOverview modules={course.modules} description={course.description} objectives={course.objectives} />
    },
    {
        label: 'Sessions',
        content: <Table data={course.cohorts} actions={{
          type: 'user',
        //   deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
          active: ['view', 'edit', 'delete']
        }}
        searchable
        columnsToShow={['id', 'name', 'email', 'start_date', 'end_date']} />
    },
    {
        label: 'Tutors',
        content: <Table data={course?.cohorts[0]?.tutor} actions={{
          type: 'user',
        //   deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
          active: ['view', 'edit', 'delete']
        }}
        searchable
        columnsToShow={['id', 'name', 'email']} />
    },
    {
        label: 'Students',
        content: <Table data={course?.cohorts[0]?.students} actions={{
          type: 'user',
        //   deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
          active: ['view', 'edit', 'delete']
        }}
        searchable
        columnsToShow={['id', 'name', 'email']} />
    },
    {
        label: 'Assignments',
        content: <Assignments tutor={course?.cohorts[0]?.tutor} assignments={course?.cohorts[0]?.assignments} />
    },
    {
        label: 'Forum',
        content: <Forum />
    },
    {
        label: 'Resources',
        content: <Files files={course?.cohorts[0]?.files} />
    },
  ];
  return (
    <div>
      <div className='flex flex-row -m-8 p-8 bg-emerald-800 justify-between items-end'>
        <h3 className='font-medium text-xl text-white'>{course.title}</h3>
        <div>
            <PrimaryButton onClick={editButton}>
                Edit
            </PrimaryButton>
        </div>
      </div>

      <div className="container mx-auto mt-12">
            <Tabs container={false} tabs={tabsData} />
        </div>
    </div>
  )
}

export default CourseContent
