import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import { PaystackButton, usePaystackPayment } from 'react-paystack';
import React, { useState, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SendInviteForm from './SendInviteForm';
import formatPrice from '@/functions';
import Checkbox from '@/Components/Checkbox';

const RentForm = ({ apartment, prices, user, openModal, payment=null }) => {
    payment = payment ?? apartment?.approval?.payment
    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        reference: payment?.reference ?? (new Date()).getTime().toString(),
        method: 'paystack',
        amount: payment?.amount ?? prices?.total,
        agreement: false,
        apartment_id: apartment?.id,
    });

    useEffect(() => {
            if (wasSuccessful) {
                openModal(false);
            }
        }, [wasSuccessful]);


    const componentProps = {
        reference: data.reference,
        email: user.email,
        amount: (payment?.amount ?? prices.total) * 100,
        metadata: {
          name: user.fname + " " + user.lname,
          phone: "090303",
        },
        publicKey: 'pk_test_045fd0529340a8cb18cd8ae4719c1b4872eb417e',
        text: "Pay " + formatPrice(payment?.amount ?? prices.total),
        onSuccess: () =>
            onSuccess({ reference: (new Date()).getTime().toString() }),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
      }

    // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    // alert("Thanks for doing business with us! Come back soon!!")
    // toast.success("Operation completed successfully!");

    post('/make-rent-payment', {
        transaction_reference: data.reference,
        amount: prices.total,
        apartment_id: apartment.id
    })
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // initializePayment(onSuccess, onClose)
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="mt-3 p-2 rounded-lg shadow-lg bg-blue-100">
            <h3 className="text-md font-bold capitalize">{payment?.type} Payments:</h3>
            <hr className="mt-3 mb-5 bg-indigo-400 w-full h-[2px]" />
            {payment?.meta?.prices && typeof payment?.meta?.prices === 'object' ? (
                Object.entries(payment.meta.prices).map(([key, price], index) => (
                    <div key={index} className="flex gap-2 justify-between items-center">
                        <p className="text-sm font-light uppercase mb-3">{key.replace('_', ' ')}</p>
                        <p className="text-sm font-light mb-3">{formatPrice(price)}</p>
                    </div>
                ))
            ) : (
                <>
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-sm font-light uppercase mb-3">REFUNDABLE SECURITY DEPOSIT (30%)</p>
                        <p className="text-sm font-light mb-3">{formatPrice(prices.security)}</p>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-sm font-light uppercase mb-3">AGREEMENT FEE (10%)</p>
                        <p className="text-sm font-light mb-3">{formatPrice(prices.agreement)}</p>
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-sm font-light uppercase mb-3">AGENCY FEE (10%)</p>
                        <p className="text-sm font-light mb-3">{formatPrice(prices.agency)}</p>
                    </div>
                </>
            )}


        <div className="flex gap-2 bg-indigo-500 rounded-md p-2 text-white justify-between items-center">
            <p className="text-sm font-light uppercase">TOTAL</p>
            <p className="text-sm font-light">{formatPrice(payment?.amount ?? prices.total)}</p>
        </div>
        </div>
        {payment?.type === 'initial' && (
            <div className="mt-3 p-2 rounded-lg mt-5 shadow-lg bg-red-100">
                <h3 className="text-md font-medium">Your company would subsequently pay: {formatPrice(prices.monthly)} monthly</h3>
            </div>
        )}

        <div className="mt-5 flex gap-3 items-center">
            <Checkbox id="agreement" name="agreement" value={data.agreement} onChange={(e) => setData('agreement', e.target.checked)} required />
            <InputLabel htmlFor="agreement" value="You've read and agree to the terms and conditions of the apartment." />
        </div>

    {/* <PaystackButton {...componentProps}> */}
    {payment?.meta?.can_pay?.includes(user?.id) && (
        <PaystackButton
            {...componentProps}
            className='inline-flex items-center px-4 py-4 bg-[#003366] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mt-5 w-full flex items-center justify-center gap-3'
            disabled={data.agreement === false}
            processing={processing} >
            Pay {formatPrice(payment?.amount ?? prices.total)}
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 13C0.5 16.3152 1.81696 19.4946 4.16117 21.8388C6.50537 24.183 9.68479 25.5 13 25.5C16.3152 25.5 19.4946 24.183 21.8388 21.8388C24.183 19.4946 25.5 16.3152 25.5 13C25.5 9.68479 24.183 6.50537 21.8388 4.16117C19.4946 1.81696 16.3152 0.5 13 0.5C9.68479 0.5 6.50537 1.81696 4.16117 4.16117C1.81696 6.50537 0.5 9.68479 0.5 13ZM14.8848 7.09668L19.7627 12.3262C19.9336 12.5117 20.0312 12.751 20.0312 13C20.0312 13.249 19.9336 13.4932 19.7627 13.6738L14.8848 18.9033C14.6797 19.123 14.3916 19.25 14.0889 19.25C13.4883 19.25 13 18.7617 13 18.1611V15.3438H8.3125C7.44824 15.3438 6.75 14.6455 6.75 13.7812V12.2188C6.75 11.3545 7.44824 10.6562 8.3125 10.6562H13V7.83887C13 7.23828 13.4883 6.75 14.0889 6.75C14.3916 6.75 14.6797 6.87695 14.8848 7.09668Z" fill="white"/>
            </svg>

        </PaystackButton>
        )}
    {/* </PaystackButton> */}
    </form>
  )
}

export default RentForm
