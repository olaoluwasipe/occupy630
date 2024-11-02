import Tabs from '@/Components/Tabs';
import Admin from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import React from 'react'


const General = ({ settings }) => {
    return (
        <div>
            <p className='p-2 px-5 bg-gray-200 font-bold mb-3 rounded-md'>
                System Information
            </p>

            <div className='flex flex-col gap-3 border border-gray-200 p-2 px-4 rounded'>
                <p>System Logo</p>
                <img src={settings[0].logo} width={100} alt='logo' />
            </div>

            <div className='flex mt-4 flex-col gap-3 border border-gray-200 p-2 px-4 rounded'>
                <p>System Name</p>
                <p className='font-bold'>{settings[0].website_name}</p>
            </div>
            
            <p className='p-2 px-5 mt-4 bg-gray-200 font-bold mb-3 rounded-md'>
                Contact Information
            </p>

            <div className='flex mt-4 flex-col gap-3 border border-gray-200 p-2 px-4 rounded'>
                <p>Support Email</p>
                <p className='font-bold'>{settings[0].support_email}</p>
            </div>

            <div className='flex mt-4 flex-col gap-3 border border-gray-200 p-2 px-4 rounded'>
                <p>Support Phone</p>
                <p className='font-bold'>{settings[0].contact_number}</p>
            </div>
        </div>
    )
}

const Index = ({auth, settings}) => {
    console.log(settings)

    const tabsData = [
        {
            label: 'General Settings',
            content: <General settings={settings} />
        },
        {
            label: 'Server Management',
            content: ''
        }
    ];
  return (
    <Admin
        user={auth.user}
        title={'System Settings'}
    >
        <Head title='System Settings' />
        <div className='container mx-auto mt-4'>
            <Tabs tabs={tabsData} />
        </div>
    </Admin>
  )
}

export default Index
