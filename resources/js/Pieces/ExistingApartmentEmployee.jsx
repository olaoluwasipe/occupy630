import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import formatPrice from '@/functions'
import { formatDate } from 'date-fns'
import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import Slider from 'react-slick'

const ExistingApartmentEmployee = ({apartment, statusKeys, settings, auth, requestRentPay}) => {
    // console.log(apartment)
  return (
    <div className='md:flex flex-row gap-6 py-12 mx-auto'>
                                <div style={{ boxShadow: '0px 2px 12px #e3e3e3' }} className="bg-white h-full md:w-1/2 md:mt-0 mt-6 overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg p-6">
                                    <div className='mb-3 flex items-center justify-between'>
                                        <div className="flex items-center">
                                            <p className='font-bold'>My Apartment</p>
                                            <p className={`text-sm ${statusKeys[apartment.status]} p-2 rounded-md text-white ml-2`}>{apartment.status}</p>
                                        </div>
                                        <div className="flex">
                                            {apartment.status === 'pending' && (
                                                <PrimaryButton>Request Approval</PrimaryButton>
                                            )}
                                            {apartment.status === 'booked' && (
                                                <PrimaryButton onClick={(e) => requestRentPay(e)}>Request Rent Payment</PrimaryButton>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 items-center w-full">
                                        <div className='w-full'>
                                            <Slider {...settings}>
                                                {apartment.images.map((image, index) => (
                                                    <div key={index}>
                                                        <img src={`${image.url}`} alt="" className="w-full h-[40vh] object-cover" />
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                                <div className='actions flex flex-col gap-3 md:w-1/2 items-center'>
                                    <div className='flex flex-col gap-3 w-full'>
                                        <h3 className='text-2xl font-semibold'>{apartment?.title}</h3>
                                        <p className='text-gray-500 flex gap-3 items-center'><FaLocationDot />{apartment?.address}</p>
                                        <div className="flex items-center justify-center">
                                            <div className="w-1/2">
                                                <p className="text-sm uppercase text-gray-500">Six Months Rent</p>
                                                <p className="text-xl font-semibold">{formatPrice(apartment?.six_months_rent)}</p>
                                            </div>
                                            <div className="w-1/2">
                                                <p className="text-sm uppercase text-gray-500">Monthly Rent</p>
                                                <p className="text-xl font-semibold">{formatPrice(apartment?.monthly_price)}</p>
                                            </div>
                                        </div>

                                        <div style={{ boxShadow: '0px 2px 12px #e3e3e3' }} className="bg-white h-full md:w-full md:mt-0 mt-6 overflow-hidden shadow-xl shadow-gray-200 sm:rounded-lg p-6">
                                            <div className="mb-3 flex justify-between items-center">
                                                <p className='font-bold'>Transactions</p>
                                                {/* <SecondaryButton>View All</SecondaryButton> */}
                                            </div>
                                            <div className="flex flex-col gap-3 w-full h-auto overflow-auto">
                                                {apartment.transactions.map((transaction, index) => (
                                                    <div className="flex gap-4 cursor-pointer justify-between flex-row mb-3 border-b border-gray-300 pb-3" key={index}>
                                                        <div>
                                                            <p className="font-medium text-gray-500">Made by {transaction.user_id == auth.user.id ? 'Me' : transaction.user.fullname}</p>
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
                                </div>
                            </div>
  )
}

export default ExistingApartmentEmployee
