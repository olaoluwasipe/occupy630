import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import TabsHorizontal from '@/Components/TabsHorizontal';
import ApartmentAddForm from '@/Forms/ApartmentAddForm';
import AttributeAddForm from '@/Forms/AttributeAddForm';
import CategoryAddForm from '@/Forms/CategoryAddForm';
import CreateUserForm from '@/Forms/CreateUserForm';
import Admin from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import React, {useState} from 'react'
import { FaPlus } from 'react-icons/fa6';

const Users = ({auth, users, apartments, attributes, categories,}) => {
    // console.log(users, learners, tutors, admins)

    const [currentTab, setCurrentTab] = useState(null);
    const [createApartment, setCreateApartment] = useState(false)
    const [createAttribute, setCreateAttribute] = useState(false)
    const [createCategory, setCreateCategory] = useState(false)
    const [deleteApartment, setDeleteApartment] = useState(false)
    const [editApartment, setEditApartment] = useState(false)
    const [editAttribute, setEditAttribute] = useState(false)
    const [editCategory, setEditCategory] = useState(false)
    const [apartment, setApartment] = useState({id: 0})
    const [attribute, setAttribute] = useState({id: 0})
    const [category, setCategory] = useState({id: 0})

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
                    action: () => {setCreateAttribute(!createAttribute)},
                    content: ''
                }
            case 'categories':
                return {
                    label: 'Add Categories',
                    color: 'bg-blue-500',
                    icon: <FaPlus />
                    ,
                    action: () => {setCreateCategory(!createCategory)},
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

    const modalAttribute = () => {
        setCreateAttribute(!createAttribute)
    }

    const modalCategory = () => {
        setEditCategory(false)
        setCreateCategory(!createCategory)
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
          content: <Table data={apartments}
          actions={{
              buttons: [
                  {
                      label: 'Edit',
                      type: 'secondary',
                      onClick: (apartment) => {setCreateApartment(true); setEditApartment(true); setApartment(apartment); console.log(apartment)},
                  },
                  // {
                  //     label: 'Decline',
                  //     type: 'danger',
                  //     onClick: (row) => alert(`Declining ${row.id}`),
                  // },
              ],
            //   defaultActions: ['delete'], // Specify default actions
              onDelete: (row) => alert(`Deleting ${row.id}`), // Optional override for delete
          }}
          searchable
          columnsToShow={['id', 'title', 'slug', 'cg_price']} />
        },
        {
          label: 'Attributes',
          val: attributes.length,
          content: <Table data={attributes} actions={{
            type: 'attributes',
            editFunction: (attribute) => {setCreateAttribute(true); setEditAttribute(true); setAttribute(attribute); console.log(attribute)},
            // deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
            active: ['view', 'edit', 'delete']
          }}
          searchable
          columnsToShow={['id', 'name']} />
        },
        {
            label: 'Categories',
            val: categories.length,
            content: <Table data={categories} actions={{
              type: 'categories',
              editFunction: (category) => {setCreateCategory(true); setEditCategory(true); setCategory(category); console.log(category)},
            //   deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
              active: ['view', 'edit', 'delete']
            }}
            searchable
            columnsToShow={['id', 'name', 'description']} />
        },
      ];

    const actions = [
        buttonSwitch(currentTab)
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
                    <p className='text-xl text-blue-800 font-semibold'>{editApartment ? 'Update' : 'Add'} Apartment</p>
                    <DangerButton onClick={modalApartment}>Close</DangerButton>
                </div>

                <ApartmentAddForm categories={categories} attributes={attributes} apartment={editApartment ? apartment : []} modalClose={() => setCreateUser(false)} />
            </div>
        </Modal>

        <Modal show={createAttribute} >
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>{editAttribute ? 'Update' : 'Add'} Property Attribute</p>
                    <DangerButton onClick={modalAttribute}>Close</DangerButton>
                </div>

                <AttributeAddForm attribute={editAttribute ? attribute : []} modalClose={() => setCreateAttribute(false)} />
            </div>
        </Modal>

        <Modal show={createCategory} >
            <div className='p-10'>
                <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                    <p className='text-xl text-blue-800 font-semibold'>{editCategory ? 'Update' : 'Add'} Property Category</p>
                    <DangerButton onClick={modalCategory}>Close</DangerButton>
                </div>

                <CategoryAddForm category={editCategory ? category : []} modalClose={() => setCreateCategory(false)} />
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
