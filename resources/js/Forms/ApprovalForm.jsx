import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import React, { useState, useRef } from 'react'
import { Head, Link, useForm } from '@inertiajs/react';
import EditorComponent from '@/Components/Editor';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import formatPrice from '@/functions';
import { FaLocationDot } from 'react-icons/fa6';
import Checkbox from '@/Components/Checkbox';
import { FaArrowAltCircleRight } from 'react-icons/fa';

const ApprovalForm = ({ apartment, approval, prices, openModal }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        action: '',
        user_pay: true,
        agree: false,
        comment: '',
        approval_id: approval?.id,
    });

  const handleSubmit = (e) => {
    e.preventDefault()

    post(route('apartment.approve-request'))

    !processing && openModal(false)
  }

  return (
    <form onSubmit={handleSubmit}>
        <h3 className="font-bold text-xl">{apartment?.title}</h3>
        <p className='text-gray-500 flex gap-3 items-center'><FaLocationDot /> {apartment?.address}, {apartment?.city}, {apartment?.state}, {apartment?.country}</p>
        <div className="flex items-center justify-between mt-3">
            <div className="w-auto">
                <p className="text-sm uppercase text-gray-500">Six Month Rent</p>
                <p className="text-xl font-semibold">{formatPrice(apartment?.six_months_rent)}</p>
            </div>
            <div className="w-auto">
                <p className="text-sm uppercase text-gray-500">Monthly Rent</p>
                <p className="text-xl font-semibold">{formatPrice(apartment?.monthly_price)}</p>
            </div>
        </div>
        <div className="mt-3 p-2 rounded-lg shadow-lg bg-blue-100">
            <h3 className="text-md font-bold">Initial Payments:</h3>
            <hr className="mt-3 mb-5 bg-indigo-400 w-full h-[2px]" />
            <div className="flex gap-2 justify-between items-center">
                <p className="text-sm font-light uppercase mb-3">SECURITY DEPOSIT(30%)</p>
                <p className="text-sm font-light mb-3">{formatPrice(prices.security)}</p>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <p className="text-sm font-light uppercase mb-3">AGREEMENT FEE(10%)</p>
                <p className="text-sm font-light mb-3">{formatPrice(prices.agreement)}</p>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <p className="text-sm font-light uppercase mb-3">AGENCY FEE(10%)</p>
                <p className="text-sm font-light mb-3">{formatPrice(prices.agency)}</p>
            </div>
            {/* <div className="flex gap-2 justify-between items-center">
                <p className="text-sm font-light uppercase mb-3">MONTHLY RENT</p>
                <p className="text-sm font-light mb-3">{formatPrice(prices.monthly)}</p>
            </div> */}
            <div className="flex gap-2 bg-indigo-500 rounded-md p-2 text-white justify-between items-center">
                <p className="text-sm font-light uppercase">TOTAL</p>
                <p className="text-sm font-light">{formatPrice(prices.total)}</p>
            </div>
        </div>
      <div className="mt-3 w-full">
          {/* <InputLabel htmlFor="inquiry_type" value="Inquiry Type" /> */}

          <SelectInput className='mt-1 block w-full' id="action" name="action" value={data.action} onChange={(e) => setData('action', e.target.value)}>
              <option value=""> Approve or Decline</option>
              <option value="approve">Approve</option>
              <option value="decline">Decline</option>
          </SelectInput>

          <InputError message={errors?.inquiry_type} className='mt-2' />
      </div>

      {data.action === 'approve' && (
            <div className="mt-5 flex flex-row gap-3 items-center">
                {/* Checkbox for user_pay */}
                <div className="flex-1 flex row items-center">
                    <Checkbox
                        name="user_pay"
                        id="user_pay"
                        checked={data.user_pay} // Bind to boolean value
                        className="mr-2"
                        onChange={(e) => setData('user_pay', e.target.checked)} // Use e.target.checked
                    />
                    <InputLabel htmlFor="user_pay" value="Let employee pay rent" />
                </div>

                {/* Checkbox for agree */}
                <div className="flex-1 flex row items-center">
                    <Checkbox
                        name="agree"
                        id="agree"
                        checked={data.agree} // Bind to boolean value
                        className="mr-2"
                        onChange={(e) => setData('agree', e.target.checked)} // Use e.target.checked
                    />
                    <InputLabel htmlFor="agree" value="Agree to terms and conditions" />
                </div>
            </div>
        )}

      <div className='mt-5'>
        <InputLabel htmlFor="comment" value={"Comment" + (data.action === 'decline' ? ' (required)' : '(optional)')} />
        <EditorComponent value={data.comment} onTextChange={(content) => setData('comment', content)} />

        <InputError message={errors?.comment} className='mt-2' />
      </div>


      <PrimaryButton
            disabled={
                data.action !== '' ? (
                    (data.action === 'approve' && !data.agree) || // Disable if 'approve' and not agreed
                    (data.action === 'decline' && data.comment === '') // Disable if 'decline' and comment is empty
                ) : true
            }
            className="mt-5 w-full flex items-center justify-center gap-3"
            processing={processing}
        >
            Approve Apartment
            <FaArrowAltCircleRight size={26} />
        </PrimaryButton>

    </form>
  )
}

export default ApprovalForm
