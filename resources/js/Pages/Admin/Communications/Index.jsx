import Table from '@/Components/Table'
import TabsHorizontal from '@/Components/TabsHorizontal'
import Notifications from '@/Content/Notifications'
import Admin from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Index = ({auth, notifications}) => {
    console.log(notifications)

    const tabsData = [
        {
            label: 'Notice Board',
            val: notifications.length,
            content: <Notifications notifications={notifications} />,
        }
    ];
  return (
    <Admin
        user={auth.user}
        title={'Communications'}
    >
        <Head title='Communications' />

        <div className="container mx-auto mt-4">
            <TabsHorizontal title="Communication" tabs={tabsData}  />
        </div>

    </Admin>
  )
}

export default Index
