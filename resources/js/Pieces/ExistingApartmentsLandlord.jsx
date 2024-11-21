import DangerButton from '@/Components/DangerButton';
import IconTextInput from '@/Components/IconTextInput';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import Tabs from '@/Components/Tabs';
import ApprovalForm from '@/Forms/ApprovalForm';
import RentForm from '@/Forms/RentForm';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const ExistingApartmentsLandlord = ({apartment, approvals, payments, auth, success, error}) => {
    const [showModal, setShowModal] = useState(false);
    const [openRent, setOpenRent] = useState(false);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [prices, setPrices] = useState({});

    const openModal = (apart) => {
        setSelectedApartment(apart ? apart : null); // Set or clear apartment
        setShowModal(!showModal); // Toggle modal state
    };

    const modalRent = (apart) => {
        setSelectedApartment(apart ? apart : null); // Set or clear apartment
        setOpenRent(!openRent); // Toggle modal state
    };

    success && toast.success(success ?? "Approval request sent")
    error && toast.error(error ?? "Something went wrong")

    // Update prices whenever selectedApartment changes
    useEffect(() => {
        if (selectedApartment) {
            const updatedPrices = {
                monthly: selectedApartment?.apartment?.monthly_price,
                yearly: selectedApartment?.apartment?.cg_price,
                security: selectedApartment?.apartment?.cg_price * 0.3,
                agreement: selectedApartment?.apartment?.cg_price * 0.05,
                agency: selectedApartment?.apartment?.cg_price * 0.05,
                total:
                    parseFloat(selectedApartment?.apartment?.cg_price * 0.3) +
                    parseFloat((selectedApartment?.apartment?.cg_price * 0.05) * 2),
                initial:
                    parseFloat(selectedApartment?.apartment?.monthly_price) +
                    parseFloat(selectedApartment?.apartment?.cg_price * 0.3) +
                    parseFloat((selectedApartment?.apartment?.cg_price * 0.05) * 2),
            };

            setPrices(updatedPrices);
        } else {
            setPrices({}); // Clear prices if no apartment is selected
        }
    }, [selectedApartment]);

    // Debugging to ensure state updates are working as expected
    useEffect(() => {
        console.log("Selected Apartment:", selectedApartment);
        console.log("Prices:", prices);
    }, [selectedApartment, prices]);

    const tabsData = [
        {
          label: 'Overview',
          content: <div></div>
        //   content: <CourseOverview modules={course.modules} description={course.description} objectives={course.objectives} />
        },
        {
            label: 'Apartments',
            content: <Table data={apartment} actions={{
              type: 'user',
            //   deleteWithValidation: (userId) => {setDeleteUser(true); setUser(userId)},
              defaultActions: ['view', 'edit']
            }}
            searchable
            columnsToShow={[
                { key: 'id', label: 'ID' },
                { key: 'title', label: 'Apartment' },
                { key: 'address', label: 'Address' },
                { key: 'price', label: 'Yearly rent', formatter: 'money' },
                { key: 'tenant.fullname', label: 'Tenant' },
                { key: 'created_at', label: 'Date', formatter: 'date' },
                { key: 'availability', formatter: 'tag' },
            ]}
            // columnsToShow={['id', 'title', 'tenant.fname', 'updated_at',]}
             />
        },
        {
            label: 'Approvals',
            content: (
                <Table
                    data={approvals}
                    actions={{
                        buttons: [
                            {
                                label: 'View',
                                type: 'primary',
                                onClick: (row) => window.location.href = '/apartment/' + row.apartment.slug,
                            },
                            {
                                label: 'Approve',
                                type: 'secondary',
                                onClick: (row) => openModal(row),
                            },
                            {
                                label: 'Decline',
                                type: 'danger',
                                onClick: (row) => alert(`Declining ${row.id}`),
                            },
                        ],
                        // defaultActions: ['view'], // Specify default actions
                        onDelete: (row) => alert(`Deleting ${row.id}`), // Optional override for delete
                    }}
                    searchable
                    columnsToShow={[
                        { key: 'id', label: 'ID' },
                        { key: 'apartment.title', label: 'Apartment' },
                        { key: 'user.fname', label: 'First Name' },
                        { key: 'user.lname', label: 'Last Name' },
                        { key: 'status', label: 'Status', formatter: 'tag' },
                        { key: 'created_at', label: 'Date', formatter: 'datetime' },
                    ]}
                />
            ),
        },
        {
            label: 'Payments',
            content: (
                <Table
                    type="apartment"
                    data={payments}
                    actions={{
                        buttons: [
                            {
                                label: 'Pay',
                                type: 'secondary',
                                onClick: (row) => modalRent(row),
                            },
                            // {
                            //     label: 'Decline',
                            //     type: 'danger',
                            //     onClick: (row) => alert(`Declining ${row.id}`),
                            // },
                        ],
                        // defaultActions: ['view'], // Specify default actions
                        onDelete: (row) => alert(`Deleting ${row.id}`), // Optional override for delete
                    }}
                    searchable
                    clickable={(row)=>alert(row.id)}
                    columnsToShow={[
                        { key: 'reference', label: 'Reference' },
                        { key: 'apartment.title', label: 'Apartment' },
                        { key: 'note', label: 'Description' },
                        { key: 'user.fullname', label: 'For' },
                        { key: 'due_date', label: 'Due Date', formatter: 'date' },
                        { key: 'type', label: 'Type' },
                        { key: 'mode', label: 'Mode' },
                        { key: 'status', label: 'Status', formatter: 'tag' },
                        { key: 'created_at', label: 'Date', formatter: 'datetime' },
                    ]}
                />
            ),
        },
      ];
  return (
    <>
        <div className="container mx-auto mt-4">
            <div className="container mx-auto mt-12">
                <Tabs container={false} tabs={tabsData} />
            </div>

            <Modal show={showModal}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Give Approval to {selectedApartment?.user?.fname} {selectedApartment?.user?.lname}</p>
                        <DangerButton onClick={openModal}>Close</DangerButton>
                    </div>


                    <ApprovalForm apartment={selectedApartment?.apartment} openModal={openModal} approval={selectedApartment} prices={prices} />
                </div>
            </Modal>

            <Modal show={openRent}  >
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Rent {selectedApartment?.apartment?.title} for {selectedApartment?.user?.fname} {selectedApartment?.user?.lname}</p>
                        <DangerButton onClick={modalRent}>Close</DangerButton>
                    </div>

                    {/* {auth.user.type === 'employer' && <AssignStaffToRentForm apartment={apartment} user={auth.user} />} */}
                    <RentForm apartment={selectedApartment?.apartment} prices={prices} payment={selectedApartment} openModal={modalRent} user={auth.user} />
                    {/* <AssignStaffToRentForm apartment={apartment} user={auth.user} /> */}
                </div>
            </Modal>

        </div>
    </>
  )
}

export default ExistingApartmentsLandlord
