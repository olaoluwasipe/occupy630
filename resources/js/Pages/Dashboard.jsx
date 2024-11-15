import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ProfilePhoto from '@/Components/ProfilePhoto';
import Update from '@/Components/Update';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaLocationDot, FaLocationPin } from 'react-icons/fa6';
import formatPrice from '@/functions';
import { formatDate } from 'date-fns';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExistingApartmentEmployee from '@/Pieces/ExistingApartmentEmployee';
import ExistingApartmentsEmployer from '@/Pieces/ExistingApartmentsEmployer';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: 20, zIndex: 100 }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: 20, zIndex: 100, width: 40 }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow style={{left: 20}} />,
    prevArrow: <PrevArrow />
  };

export default function Dashboard({ auth, courses, tasks, docs, apartment }) {
    console.log(apartment)
    const [openNav, setOpenNav] = useState(false)
    const [action, setAction] = useState('')

    const navFunc = (e, action='') => {
        e.preventDefault()
        setOpenNav(!openNav)
        setAction(action)
    }

    const requestRentPay = (e) => {
        axios.post(route('dashboard.rent.pay', apartment.id),
            )
        navFunc(e, 'chat')
    }

    const statusKeys = {
        'pending': 'bg-yellow-500',
        'success': 'bg-green-500',
        'rejected': 'bg-red-500',
        'completed': 'bg-blue-500',
        'cancelled': 'bg-gray-500',
        'in_progress': 'bg-orange-500',
        'on_hold': 'bg-purple-500',
        'booked': 'bg-pink-500',
        'assigned': 'bg-indigo-500',
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
                                <div className='flex flex-1 items-center gap-5 p-5 flex-col cursor-pointer justify-center bg-gray-600 text-center rounded-lg h-100'>
                                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.16667 16.6667V3.33333C5.16667 1.49479 6.66146 0 8.5 0H21.8333C23.6719 0 25.1667 1.49479 25.1667 3.33333V13.6198C25.1667 14.5052 24.8177 15.3542 24.1927 15.9792L21.1458 19.026C20.5208 19.651 19.6719 20 18.7865 20H8.5C6.66146 20 5.16667 18.5052 5.16667 16.6667ZM14.3333 5C13.875 5 13.5 5.375 13.5 5.83333V8.33333H11C10.5417 8.33333 10.1667 8.70833 10.1667 9.16667V10.8333C10.1667 11.2917 10.5417 11.6667 11 11.6667H13.5V14.1667C13.5 14.625 13.875 15 14.3333 15H16C16.4583 15 16.8333 14.625 16.8333 14.1667V11.6667H19.3333C19.7917 11.6667 20.1667 11.2917 20.1667 10.8333V9.16667C20.1667 8.70833 19.7917 8.33333 19.3333 8.33333H16.8333V5.83333C16.8333 5.375 16.4583 5 16 5H14.3333ZM15.5833 22.5C16.276 22.5 16.8333 23.0573 16.8333 23.75C16.8333 24.4427 16.276 25 15.5833 25H7.25C3.33855 25 0.166672 21.8281 0.166672 17.9167V6.25C0.166672 5.55729 0.723963 5 1.41667 5C2.10938 5 2.66667 5.55729 2.66667 6.25V17.9167C2.66667 20.4479 4.71876 22.5 7.25 22.5H15.5833Z" fill="white"/>
                                    </svg>
                                    <p className='text-white'>Create Assignment </p>
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

                    {auth.user.type === 'employee' ? (
                        apartment ? (
                            <ExistingApartmentEmployee apartment={apartment} statusKeys={statusKeys} settings={settings} auth={auth} requestRentPay={requestRentPay} />
                        ) : (
                            <PrimaryButton>Get Apartment</PrimaryButton>
                        )
                    ) : (
                        <ExistingApartmentsEmployer apartment={apartment} />
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
