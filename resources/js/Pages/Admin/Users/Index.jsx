import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import TabsHorizontal from '@/Components/TabsHorizontal';
import CreateUserForm from '@/Forms/CreateUserForm';
import Admin from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React, {useState} from 'react'

const Users = ({auth, users, companies, tutors, admins, courses, cohorts, permissions}) => {
    // console.log(users)

    const [createUser, setCreateUser] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const [editUser, setEditUser] = useState(false)
    const [user, setUser] = useState({id: 0})

    const modalUser = () => {
        setEditUser(false)
        setCreateUser(!createUser)
    }

    const modalDelete = () => {
        setDeleteUser(!deleteUser)
    }
    const tabsData = [
        {
          label: 'Companies',
          val: companies.length,
          content: <Table data={companies} actions={{
            type: 'user',
            editFunction: (user) => {setCreateUser(true); setEditUser(true); setUser(user); console.log(user)},
            deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId);},
            active: ['view', 'edit', 'delete']
          }}
          searchable
          columnsToShow={['id', 'name', 'address', 'phone', 'email']} />
        },
        {
          label: 'Users',
          val: users.length,
          content: <Table data={users} actions={{
            type: 'user',
            editFunction: (user) => {setCreateUser(true); setEditUser(true); setUser(user); console.log(user)},
            deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
            active: ['view', 'edit', 'delete']
          }}
          searchable
          columnsToShow={['id', 'fullname', 'email', 'phone', 'type', 'company.name']} />
        },
        {
            label: 'Admins',
            val: admins.length,
            content: <Table data={admins} actions={{
              type: 'user',
              editFunction: (user) => {setCreateUser(true); setEditUser(true); setUser(user); console.log(user)},
              deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
              active: ['view', 'edit', 'delete']
            }}
            searchable
            columnsToShow={['id', 'name', 'email']} />
        },
        {
            label: 'WaitList',
            content: ''
        },
      ];

    const actions = [
        {
            label: 'Add User',
            color: 'bg-blue-500',
            icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.57692 1.57692C8.57692 0.98125 8.09567 0.5 7.5 0.5C6.90433 0.5 6.42308 0.98125 6.42308 1.57692V6.42308H1.57692C0.98125 6.42308 0.5 6.90433 0.5 7.5C0.5 8.09567 0.98125 8.57692 1.57692 8.57692H6.42308V13.4231C6.42308 14.0188 6.90433 14.5 7.5 14.5C8.09567 14.5 8.57692 14.0188 8.57692 13.4231V8.57692H13.4231C14.0188 8.57692 14.5 8.09567 14.5 7.5C14.5 6.90433 14.0188 6.42308 13.4231 6.42308H8.57692V1.57692Z" fill="white"/>
            </svg>
            ,
            action: () => {setCreateUser(!createUser)},
            content: ''
        },
        {
            label: 'Delete User',
            color: 'bg-red-600',
            icon: <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22233 1.27778H10.9446V2.83333H0.0556641V1.27778H2.77789L3.55566 0.5H7.44455L8.22233 1.27778ZM2.38902 14.5C1.53347 14.5 0.833466 13.8 0.833466 12.9444V3.6111H10.1668V12.9444C10.1668 13.8 9.4668 14.5 8.61124 14.5H2.38902Z" fill="white"/>
            </svg>
            ,
            content: ''
        }
    ]
  return (
    <Admin
            user={auth.user}
            title="User Management"
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title='User Management' />

        <div className="container mx-auto mt-4">
            <TabsHorizontal title="Users" tabs={tabsData} actions={actions} />
        </div>

        <Modal show={createUser} >
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>{editUser ? 'Update' : 'Add'} User</p>
                    <DangerButton onClick={modalUser}>Close</DangerButton>
                </div>

                <CreateUserForm courses={courses} permissions={permissions} user={editUser ? user : []} cohorts={cohorts} modalClose={() => setCreateUser(false)} />
            </div>
        </Modal>

        <Modal show={deleteUser} >
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>Are you sure you want to delete {user?.name}?</p>
                    <DangerButton onClick={modalDelete}>Close</DangerButton>
                </div>
                <div className='flex flex-row items-center w-full justify-center gap-4'>
                    <SecondaryButton onClick={modalDelete}>Cancel</SecondaryButton>
                    <Link
                        href={route('admin.delete-user', user?.id)}
                        method='delete'>
                        <DangerButton
                            onClick={() => {
                            console.log(user)
                            setTimeout(setDeleteUser(false), 2000)
                        }}>Delete</DangerButton>
                    </Link>
                </div>
            </div>
        </Modal>
    </Admin>
  )
}

export default Users
