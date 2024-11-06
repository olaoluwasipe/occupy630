import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import TabsHorizontal from '@/Components/TabsHorizontal';
import ApartmentAddForm from '@/Forms/ApartmentAddForm';
import CreateUserForm from '@/Forms/CreateUserForm';
import Admin from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React, {useState} from 'react'
import { FaPlus } from 'react-icons/fa6';

const Users = ({auth, users, apartments, attributes, categories,}) => {
    // console.log(users, learners, tutors, admins)

    const [currentTab, setCurrentTab] = useState(null);
    const [createApartment, setCreateApartment] = useState(false)
    const [deleteApartment, setDeleteApartment] = useState(false)
    const [editApartment, setEditApartment] = useState(false)
    const [apartment, setApartment] = useState({id: 0})

    const handleChangeTab = (label) => {
        setCurrentTab(label)
        console.log(label)
    }

    const buttonSwitch = (label) => {
        label = label ? label.toLowerCase() : '';
        switch (label) {
            case 'apartments':
                return {
                    label: 'Add Apartment',
                    color: 'bg-blue-500',
                    icon: <FaPlus />
                    ,
                    action: () => {setCreateApartment(!createApartment)},
                    content: ''
                }

            case 'attributes':
                return {
                    label: 'Add Attributes',
                    color: 'bg-blue-500',
                    icon: <FaPlus />
                    ,
                    action: () => {setCreateApartment(!createApartment)},
                    content: ''
                }
            case 'categories':
                return {
                    label: 'Add Categories',
                    color: 'bg-blue-500',
                    icon: <FaPlus />
                    ,
                    action: () => {setCreateApartment(!createApartment)},
                    content: ''
                }
            default:
                return {
                    label: 'Add Apartment',
                    color: 'bg-blue-500',
                    icon: <FaPlus />
                    ,
                    action: () => {setCreateApartment(!createApartment)},
                    content: ''
                }
        }
    }

    const modalApartment = () => {
        setEditApartment(false)
        setCreateApartment(!createApartment)
    }

    const modalDelete = () => {
        setDeleteApartment(!deleteApartment)
    }
    const tabsData = [
        {
          label: 'Apartments',
          val: apartments.length,
          content: <Table data={apartments} actions={{
            type: 'apartments',
            editFunction: (apartment) => {setCreateApartment(true); setEditApartment(true); setApartment(apartment); console.log(apartment)},
            // deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId);},
            active: ['view', 'edit', 'delete']
          }}
          searchable
          columnsToShow={['id', 'title', 'slug', 'cg_price']} />
        },
        {
          label: 'Attributes',
          val: attributes.length,
          content: <Table data={attributes} actions={{
            type: 'attributes',
            // editFunction: (user) => {setCreateUser(true); setEditUser(true); setUser(user); console.log(user)},
            // deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
            active: ['view', 'edit', 'delete']
          }}
          searchable
          columnsToShow={['id', 'name', 'email']} />
        },
        {
            label: 'Categories',
            val: categories.length,
            content: <Table data={categories} actions={{
              type: 'categories',
            //   editFunction: (user) => {setCreateUser(true); setEditUser(true); setUser(user); console.log(user)},
            //   deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
              active: ['view', 'edit', 'delete']
            }}
            searchable
            columnsToShow={['id', 'name', 'email']} />
        },
      ];

    const actions = [
        buttonSwitch(currentTab)
        // {
        //     label: 'Delete User',
        //     color: 'bg-red-600',
        //     icon: <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22233 1.27778H10.9446V2.83333H0.0556641V1.27778H2.77789L3.55566 0.5H7.44455L8.22233 1.27778ZM2.38902 14.5C1.53347 14.5 0.833466 13.8 0.833466 12.9444V3.6111H10.1668V12.9444C10.1668 13.8 9.4668 14.5 8.61124 14.5H2.38902Z" fill="white"/>
        //     </svg>
        //     ,
        //     content: ''
        // }
    ]
  return (
    <Admin
        user={auth.user}
        title="Property Management"
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title='Property Management' />

        <div className="container mx-auto mt-4">
            <TabsHorizontal zeActive={handleChangeTab} title="Apartments" tabs={tabsData} actions={actions} />
        </div>

        <Modal maxWidth='7xl' minHeight='[80vh]' show={createApartment} >
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>{editApartment ? 'Update' : 'Add'} User</p>
                    <DangerButton onClick={modalApartment}>Close</DangerButton>
                </div>

                <ApartmentAddForm categories={categories} attributes={attributes} apartment={editApartment ? apartment : []} modalClose={() => setCreateUser(false)} />
            </div>
        </Modal>

        {/* <Modal show={deleteUser} >
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
        </Modal> */}
    </Admin>
  )
}

export default Users
