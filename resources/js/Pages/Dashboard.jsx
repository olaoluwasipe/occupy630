import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ProfilePhoto from '@/Components/ProfilePhoto';
import Update from '@/Components/Update';
import SendInviteForm from '@/Forms/SendInviteForm';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

export default function Dashboard({ auth, courses, tasks, docs }) {
    console.log(docs)
    const [openModal, setOpenModal] = useState(false);

    const modalOpen = () => {
        setOpenModal(!openModal);
    }
    // console.log(tasks)
    return (
        <AuthenticatedLayout
            user={auth.user}
            docslink = {docs}
            openNav={openNav}
            prevAction={action}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

        <Head title="Dashboard" />
            <div className="py-12 md:px-0 px-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg md:flex flex-row items-center p-6">
                        <div className='w-1/2 flex flex-row gap-3 items-center'>
                            <ProfilePhoto style={`w-24 h-24 border-green-500 border border-4`} user={auth.user} />
                            <div className='flex flex-col'>
                                <h2 className='text-2xl font-bold text-blue-900'>{auth.user.fname} {auth.user.lname}</h2>
                                <p>{auth.user.email} | {auth.user.phonenumber}</p>
                                <p className={`text-${auth.user.type === 'learner' ? 'blue' : 'green' }-800 font-bold capitalize`}>{auth.user.type || 'Learner'}</p>
                            </div>
                        </div>
                        {auth.user.type === 'learner' ? (
                            <div className="flex flex-row gap-3 items-center md:w-3/4 sm:mt-2 h-full">
                                <div className='flex flex-1 flex-col justify-center bg-emerald-600 p-3 text-center rounded-lg h-100'>
                                    <h2 className='text-2xl font-bold text-white'>{courses.length}</h2>
                                    <p className='text-white'>Courses Enrolled</p>
                                </div>
                                <div className='flex flex-1 flex-col justify-center bg-blue-900 p-3 text-center rounded-lg h-100'>
                                    <h2 className='text-2xl font-bold text-white'>{tasks.length}</h2>
                                    <p className='text-white'>Pending Tasks</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-row gap-3 items-center w-3/4 h-full">
                                <div onClick={modalOpen} className='flex flex-1 items-center gap-5 p-5 flex-col cursor-pointer justify-center bg-gray-600 text-center rounded-lg h-100'>
                                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.16667 16.6667V3.33333C5.16667 1.49479 6.66146 0 8.5 0H21.8333C23.6719 0 25.1667 1.49479 25.1667 3.33333V13.6198C25.1667 14.5052 24.8177 15.3542 24.1927 15.9792L21.1458 19.026C20.5208 19.651 19.6719 20 18.7865 20H8.5C6.66146 20 5.16667 18.5052 5.16667 16.6667ZM14.3333 5C13.875 5 13.5 5.375 13.5 5.83333V8.33333H11C10.5417 8.33333 10.1667 8.70833 10.1667 9.16667V10.8333C10.1667 11.2917 10.5417 11.6667 11 11.6667H13.5V14.1667C13.5 14.625 13.875 15 14.3333 15H16C16.4583 15 16.8333 14.625 16.8333 14.1667V11.6667H19.3333C19.7917 11.6667 20.1667 11.2917 20.1667 10.8333V9.16667C20.1667 8.70833 19.7917 8.33333 19.3333 8.33333H16.8333V5.83333C16.8333 5.375 16.4583 5 16 5H14.3333ZM15.5833 22.5C16.276 22.5 16.8333 23.0573 16.8333 23.75C16.8333 24.4427 16.276 25 15.5833 25H7.25C3.33855 25 0.166672 21.8281 0.166672 17.9167V6.25C0.166672 5.55729 0.723963 5 1.41667 5C2.10938 5 2.66667 5.55729 2.66667 6.25V17.9167C2.66667 20.4479 4.71876 22.5 7.25 22.5H15.5833Z" fill="white"/>
                                    </svg>
                                    <p className='text-white'>Add Employees </p>
                                </div>
                                <div className='flex flex-1 items-center gap-5 p-5 flex-col cursor-pointer justify-center bg-emerald-600 text-center rounded-lg h-100'>
                                    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.31247 0C7.17673 0 7.87497 0.698242 7.87497 1.5625V3.125H14.125V1.5625C14.125 0.698242 14.8232 0 15.6875 0C16.5517 0 17.25 0.698242 17.25 1.5625V3.125H19.5937C20.8877 3.125 21.9375 4.1748 21.9375 5.46875V7.8125H0.0624695V5.46875C0.0624695 4.1748 1.11227 3.125 2.40622 3.125H4.74997V1.5625C4.74997 0.698242 5.44821 0 6.31247 0ZM0.0624695 9.375H21.9375V22.6562C21.9375 23.9502 20.8877 25 19.5937 25H2.40622C1.11227 25 0.0624695 23.9502 0.0624695 22.6562V9.375ZM3.96872 12.5C3.53903 12.5 3.18747 12.8516 3.18747 13.2812V17.9688C3.18747 18.3984 3.53903 18.75 3.96872 18.75H8.65622C9.08591 18.75 9.43747 18.3984 9.43747 17.9688V13.2812C9.43747 12.8516 9.08591 12.5 8.65622 12.5H3.96872Z" fill="white"/>
                                    </svg>
                                    <p className='text-white'>Add to Schedule </p>
                                </div>
                                <div className='flex flex-1 items-center gap-5 p-5 flex-col cursor-pointer justify-center bg-blue-900 text-center rounded-lg h-100'>
                                    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.08331 0C2.35968 0 0.958313 1.40137 0.958313 3.125V21.875C0.958313 23.5986 2.35968 25 4.08331 25H16.5833C18.3069 25 19.7083 23.5986 19.7083 21.875V7.8125H13.4583C12.5941 7.8125 11.8958 7.11426 11.8958 6.25V0H4.08331ZM13.4583 0V6.25H19.7083L13.4583 0ZM11.5052 19.9219C11.5052 20.5713 10.9827 21.0938 10.3333 21.0938C9.6839 21.0938 9.16144 20.5713 9.16144 19.9219V14.9365L7.64777 16.4502C7.18878 16.9092 6.44659 16.9092 5.99249 16.4502C5.53839 15.9912 5.53351 15.249 5.99249 14.7949L9.50812 11.2793C9.9671 10.8203 10.7093 10.8203 11.1634 11.2793L14.679 14.7949C15.138 15.2539 15.138 15.9961 14.679 16.4502C14.22 16.9043 13.4778 16.9092 13.0237 16.4502L11.5101 14.9365V19.9219H11.5052Z" fill="white"/>
                                    </svg>
                                    <p className='text-white'>Upload File</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {apartment ? (
                    <div className='md:flex flex-row gap-6 py-12 mx-auto'>
                        <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white h-full md:w-1/2 md:mt-0 mt-6 overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg p-6">
                            <div className='mb-3 flex items-center justify-between'>
                                <div className="flex items-center">
                                    <p className='font-bold'>My Apartment</p>
                                    <p className={`text-sm ${statusKeys[apartment.status]} p-2 rounded-md text-white ml-2`}>{apartment.status}</p>
                                </div>
                                <div className="flex">
                                    {apartment.status == 'pending' && (
                                        <PrimaryButton>Request Approval</PrimaryButton>
                                    )}
                                    {apartment.status == 'booked' && (
                                        <PrimaryButton onClick={(e) => requestRentPay(e)}>Request Rent Payment</PrimaryButton>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 items-center w-full">
                                {apartment ? (
                                    <div className='w-full'>
                                        <Slider {...settings}>
                                            {apartment.images.map((image, index) => (
                                                <div key={index}>
                                                    <img src={`${image.url}`} alt="" className="w-full h-[40vh] object-cover" />
                                                </div>
                                            ))}
                                        </Slider>

                                    </div>
                                ) : <PrimaryButton>Get Apartment</PrimaryButton>}
                            </div>
                        </div>
                        <div className='actions flex flex-col gap-3 md:w-1/2 items-center' >
                            <div className='flex flex-col gap-3 w-full'>
                                <h3 className='text-2xl font-semibold'>{apartment?.title}</h3>
                                <p className='text-gray-500 flex gap-3 items-center'><FaLocationDot/>{apartment?.address}</p>
                                <div className="flex items-center justify-center">
                                    <div className="w-1/2">
                                        <p className="text-sm uppercase text-gray-500">Yearly Rent</p>
                                        <p className="text-xl font-semibold">{formatPrice(apartment?.cg_price)}</p>
                                    </div>
                                    <div className="w-1/2">
                                        <p className="text-sm uppercase text-gray-500">Monthly Rent</p>
                                        <p className="text-xl font-semibold">{formatPrice(apartment?.monthly_price)}</p>
                                    </div>
                                </div>

                            <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white h-full md:w-full md:mt-0 mt-6 overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg p-6">
                                <div className="mb-3 flex justify-between items-center">
                                    <p className='font-bold'>Transactions</p>
                                    <SecondaryButton>
                                        View All
                                    </SecondaryButton>
                                </div>
                                <div className="flex flex-col gap-3 w-full h-auto overflow-auto">
                                    {apartment.transactions.slice(0,3).map((transaction, index) => (
                                        <div className="flex gap-4 cursor-pointer justify-between flex-row mb-3 border-b border-gray-300 pb-3" key={index}>
                                            {/* <div>
                                                <p className="font-medium text-gray-500">Trx Ref</p>
                                                <p className='text'>{transaction.reference}</p>
                                            </div> */}
                                            <div>
                                                <p className="font-medium text-gray-500">Made by {transaction.user_id == auth.user.id ? 'Me' : transaction.user.fname}</p>
                                                <p className='text'>{formatPrice(transaction.amount)}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-500">Description</p>
                                                <p className='text'>{transaction.note}</p>
                                            </div>
                                            <div>
                                                <p className={`font-medium text-sm ${statusKeys[transaction.status]} rounded p-1 w-auto text-white`}>{transaction?.status}</p>
                                                <p className='text'>{formatDate(transaction.created_at, 'd MMM, y')}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            </div>
                            {/* <div className='flex flex-row gap-3 w-full'>
                                <a href={route('courses')} className='action flex flex-col items-start h-48 rounded-2xl p-6 bg-orange-100 md:w-1/2 sm:w-full justify-center'>
                                    <img src='images/icons/courses-icon.png' />
                                    <p className='text-orange-900'>My Courses</p>
                                </a>
                                {auth.user.type === 'learner'? (
                                    <a href={route('tutors')} className='action flex flex-col cursor-pointer items-start h-48 rounded-2xl p-6 bg-purple-100 md:w-1/2 sm:flex-1 justify-center'>
                                        <img src='images/icons/tutors-icon.png' />
                                        <p className='text-purple-900'>Tutors</p>
                                    </a>
                                ) : auth.user.type === 'tutor' && (
                                    <a className='action flex flex-col cursor-pointer items-start h-48 rounded-2xl p-6 bg-purple-100 w-1/2 justify-center'>
                                        <svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.4375 0.5C9.6807 0.5 10.873 0.99386 11.7521 1.87294C12.6311 2.75201 13.125 3.9443 13.125 5.1875C13.125 6.4307 12.6311 7.62299 11.7521 8.50206C10.873 9.38114 9.6807 9.875 8.4375 9.875C7.1943 9.875 6.00201 9.38114 5.12294 8.50206C4.24386 7.62299 3.75 6.4307 3.75 5.1875C3.75 3.9443 4.24386 2.75201 5.12294 1.87294C6.00201 0.99386 7.1943 0.5 8.4375 0.5ZM30 0.5C31.2432 0.5 32.4355 0.99386 33.3146 1.87294C34.1936 2.75201 34.6875 3.9443 34.6875 5.1875C34.6875 6.4307 34.1936 7.62299 33.3146 8.50206C32.4355 9.38114 31.2432 9.875 30 9.875C28.7568 9.875 27.5645 9.38114 26.6854 8.50206C25.8064 7.62299 25.3125 6.4307 25.3125 5.1875C25.3125 3.9443 25.8064 2.75201 26.6854 1.87294C27.5645 0.99386 28.7568 0.5 30 0.5ZM0 18.002C0 14.5508 2.80078 11.75 6.25195 11.75H8.75391C9.68555 11.75 10.5703 11.9551 11.3672 12.3184C11.291 12.7402 11.2559 13.1797 11.2559 13.625C11.2559 15.8633 12.2402 17.873 13.793 19.25C13.7812 19.25 13.7695 19.25 13.752 19.25H1.24805C0.5625 19.25 0 18.6875 0 18.002ZM23.748 19.25C23.7363 19.25 23.7246 19.25 23.707 19.25C25.2656 17.873 26.2441 15.8633 26.2441 13.625C26.2441 13.1797 26.2031 12.7461 26.1328 12.3184C26.9297 11.9492 27.8145 11.75 28.7461 11.75H31.248C34.6992 11.75 37.5 14.5508 37.5 18.002C37.5 18.6934 36.9375 19.25 36.252 19.25H23.748ZM13.125 13.625C13.125 12.1332 13.7176 10.7024 14.7725 9.64752C15.8274 8.59263 17.2582 8 18.75 8C20.2418 8 21.6726 8.59263 22.7275 9.64752C23.7824 10.7024 24.375 12.1332 24.375 13.625C24.375 15.1168 23.7824 16.5476 22.7275 17.6025C21.6726 18.6574 20.2418 19.25 18.75 19.25C17.2582 19.25 15.8274 18.6574 14.7725 17.6025C13.7176 16.5476 13.125 15.1168 13.125 13.625ZM7.5 28.9355C7.5 24.623 10.998 21.125 15.3105 21.125H22.1895C26.502 21.125 30 24.623 30 28.9355C30 29.7969 29.3027 30.5 28.4355 30.5H9.06445C8.20312 30.5 7.5 29.8027 7.5 28.9355Z" fill="#8A50FC"/>
                                        </svg>
                                        <p className='text-purple-900'>Students</p>
                                    </a>
                                )}
                            </div>
                            <div className='flex flex-row gap-3 w-full'>
                                {auth.user.type === 'learner'? (
                                    <a href='#' className='action flex flex-col items-start h-48 rounded-2xl p-6 bg-red-100 w-1/2 justify-center'>
                                        <img src='images/icons/tasks-icon.png' />
                                        <p className='text-red-900'>My Tasks</p>
                                    </a>
                                ) : auth.user.type === 'tutor' && (
                                    <a href='#' className='action flex flex-col items-start h-48 rounded-2xl p-6 bg-red-100 w-1/2 justify-center'>
                                            <svg width="27" height="31" viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.5 0.5C8.53711 0.5 9.375 1.33789 9.375 2.375V4.25H16.875V2.375C16.875 1.33789 17.7129 0.5 18.75 0.5C19.7871 0.5 20.625 1.33789 20.625 2.375V4.25H23.4375C24.9902 4.25 26.25 5.50977 26.25 7.0625V9.875H0V7.0625C0 5.50977 1.25977 4.25 2.8125 4.25H5.625V2.375C5.625 1.33789 6.46289 0.5 7.5 0.5ZM0 11.75H26.25V27.6875C26.25 29.2402 24.9902 30.5 23.4375 30.5H2.8125C1.25977 30.5 0 29.2402 0 27.6875V11.75ZM3.75 16.4375V18.3125C3.75 18.8281 4.17188 19.25 4.6875 19.25H6.5625C7.07812 19.25 7.5 18.8281 7.5 18.3125V16.4375C7.5 15.9219 7.07812 15.5 6.5625 15.5H4.6875C4.17188 15.5 3.75 15.9219 3.75 16.4375ZM11.25 16.4375V18.3125C11.25 18.8281 11.6719 19.25 12.1875 19.25H14.0625C14.5781 19.25 15 18.8281 15 18.3125V16.4375C15 15.9219 14.5781 15.5 14.0625 15.5H12.1875C11.6719 15.5 11.25 15.9219 11.25 16.4375ZM19.6875 15.5C19.1719 15.5 18.75 15.9219 18.75 16.4375V18.3125C18.75 18.8281 19.1719 19.25 19.6875 19.25H21.5625C22.0781 19.25 22.5 18.8281 22.5 18.3125V16.4375C22.5 15.9219 22.0781 15.5 21.5625 15.5H19.6875ZM3.75 23.9375V25.8125C3.75 26.3281 4.17188 26.75 4.6875 26.75H6.5625C7.07812 26.75 7.5 26.3281 7.5 25.8125V23.9375C7.5 23.4219 7.07812 23 6.5625 23H4.6875C4.17188 23 3.75 23.4219 3.75 23.9375ZM12.1875 23C11.6719 23 11.25 23.4219 11.25 23.9375V25.8125C11.25 26.3281 11.6719 26.75 12.1875 26.75H14.0625C14.5781 26.75 15 26.3281 15 25.8125V23.9375C15 23.4219 14.5781 23 14.0625 23H12.1875ZM18.75 23.9375V25.8125C18.75 26.3281 19.1719 26.75 19.6875 26.75H21.5625C22.0781 26.75 22.5 26.3281 22.5 25.8125V23.9375C22.5 23.4219 22.0781 23 21.5625 23H19.6875C19.1719 23 18.75 23.4219 18.75 23.9375Z" fill="#F65464"/>
                                            </svg>

                                        <p className='text-red-900'>My Schedule</p>
                                    </a>
                                )}
                                <a className='action flex flex-col cursor-pointer items-start h-48 rounded-2xl p-6 bg-blue-100 w-1/2 justify-center'>
                                    <img src='images/icons/assignments-icon.png' />
                                    <p className='text-blue-900'>Documents</p>
                                </a>
                            </div> */}
                        </div>
                    </div>
                    ): <PrimaryButton>Get Apartment</PrimaryButton>}
                </div>
            </div>
            <Modal show={openModal}>
                <div className='p-10'>
                    <div className='flex flex-row mb-10 flex-nowrap justify-between items-center'>
                        <p className='text-xl text-blue-800 font-semibold'>Add Employee</p>
                        <DangerButton onClick={modalOpen}>Close</DangerButton>
                    </div>

                    <SendInviteForm />
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
