import DangerButton from '@/Components/DangerButton';
import IconTextInput from '@/Components/IconTextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

const ExistingApartmentsEmployer = ({apartment}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredData = apartment.filter((session) =>
        session?.title.toLowerCase().includes(searchQuery.toLowerCase()) || session?.tenant.fname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <>
    <div className="container mx-auto mt-4">
            <div className='bg-white rounded p-4 mb-5'>
                <PrimaryButton onClick={()=> {}} className='mb-4'>Create New Session</PrimaryButton>
                <IconTextInput
                    icon={<FaSearch />}
                    style={{borderRadious: '900px'}}
                    rounded="rounded-full"
                    className='border border-gray-400 bg-slate-50 mb-6 rounded-full'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div class="relative overflow-x-auto">
            <h2 className='text-2xl text-blue-950 mb-4 font-semibold'>Active Sessions</h2>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Apartment
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Students
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tutor
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                End Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {apartment.map ((apart) => (
                        <tr class="bg-white border-b  ">
                            <td class="px-6 py-4">
                                {apart.id}
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {apart?.title}
                            </th>
                            <td class="px-6 py-4">
                                {apart?.name}
                            </td>
                            <td class="px-6 py-4">
                                {apart?.tenant.length}
                            </td>
                            <td class="px-6 py-4">
                                {apart?.tutor?.name}
                            </td>
                            <td class="px-6 py-4">
                                {apart?.start_date}
                            </td>
                            <td class="px-6 py-4">
                                {apart?.end_date}
                            </td>
                            <td>
                                <div class="flex items-center space-x-4">
                                    {/* <PrimaryButton style={{padding: "0.5rem 1rem"}} className='py-2'>View</PrimaryButton> */}
                                    {/* <SecondaryButton onClick={() => startEdit(session)}>Edit</SecondaryButton>
                                    <DangerButton onClick={() => {modalDelete(!deleteSession); setSession(session)}}>Delete</DangerButton> */}
                                </div>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>


        </div>
    </>
  )
}

export default ExistingApartmentsEmployer
