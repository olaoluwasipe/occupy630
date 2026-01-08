import formatPrice from '@/functions';
import { Head } from '@inertiajs/react';
import React from 'react';
import { PaystackButton } from 'react-paystack';

const Payment = ({ payment }) => {
  const handlePay = () => {
    // Add your payment processing logic here
    alert(`Redirecting to payment for Invoice #${payment.id}`);
  };

  const componentProps = {
    reference: payment.reference,
    email: payment.user.email,
    amount: (payment?.amount) * 100,
    metadata: {
      name: payment.user.fullname,
    //   phone: "090303",
    },
    publicKey: 'pk_test_045fd0529340a8cb18cd8ae4719c1b4872eb417e',
    text: "Pay " + formatPrice(payment?.amount),
    onSuccess: () =>
        onSuccess({ reference: (new Date()).getTime().toString() }),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  }

  return (
    <div className="h-screen flex justify-center items-center">
        <Head title={"Pay Invoice"} />
        <div className="max-w-4xl w-screen mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        {/* Invoice Header */}
        <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
            <p className="text-gray-600">Invoice ID: <span className="font-medium">{payment.reference}</span></p>
            <p className="text-gray-600">Due Date: <span className="font-medium">{payment.due_date}</span></p>
        </div>

        {/* Billing Details */}
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Billing Details</h2>
            <p className="text-gray-600"><strong>Name:</strong> {payment.user.fullname}</p>
            <p className="text-gray-600"><strong>Email:</strong> {payment.user.email}</p>
        </div>

        {/* Invoice Items */}
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Items</h2>
            <table className="w-full border-collapse border border-gray-300 text-left">
            <thead className="bg-gray-200">
                <tr>
                <th className="border border-gray-300 px-4 py-2">Item</th>
                {/* <th className="border border-gray-300 px-4 py-2">Quantity</th> */}
                <th className="border border-gray-300 px-4 py-2">Price</th>
                {/* <th className="border border-gray-300 px-4 py-2">Total</th> */}
                </tr>
            </thead>
            <tbody>
            {Object.entries(payment?.meta?.prices || {}).map(([key, value], index) => (
                <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{key.replace('_', ' ').toUpperCase()}</td>
                    {/* <td className="border border-gray-300 px-4 py-2">{item.quantity}</td> */}
                    <td className="border border-gray-300 px-4 py-2">{formatPrice((value))}</td>
                    {/* <td className="border border-gray-300 px-4 py-2">
                    Additional column if needed
                    </td> */}
                </tr>
                ))}

            </tbody>
            </table>
        </div>

        {/* Total Section */}
        <div className="mb-6 text-right">
            <h2 className="text-xl font-semibold text-gray-700">Total: {formatPrice(parseFloat(payment.amount))}</h2>
        </div>

        {/* Pay Now Button */}
        {payment.status === 'completed' ? (
            <div className="mb-6 text-center">
                <p className="text-green-600 text-lg font-semibold">Payment Successful</p>
            </div>
        ) : (
            <PaystackButton
                {...componentProps}
                className='inline-flex items-center px-4 py-4 bg-[#003366] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mt-5 w-full flex items-center justify-center gap-3'
                disabled={false}
                processing={false} >
                Pay {formatPrice(payment?.amount)}
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 13C0.5 16.3152 1.81696 19.4946 4.16117 21.8388C6.50537 24.183 9.68479 25.5 13 25.5C16.3152 25.5 19.4946 24.183 21.8388 21.8388C24.183 19.4946 25.5 16.3152 25.5 13C25.5 9.68479 24.183 6.50537 21.8388 4.16117C19.4946 1.81696 16.3152 0.5 13 0.5C9.68479 0.5 6.50537 1.81696 4.16117 4.16117C1.81696 6.50537 0.5 9.68479 0.5 13ZM14.8848 7.09668L19.7627 12.3262C19.9336 12.5117 20.0312 12.751 20.0312 13C20.0312 13.249 19.9336 13.4932 19.7627 13.6738L14.8848 18.9033C14.6797 19.123 14.3916 19.25 14.0889 19.25C13.4883 19.25 13 18.7617 13 18.1611V15.3438H8.3125C7.44824 15.3438 6.75 14.6455 6.75 13.7812V12.2188C6.75 11.3545 7.44824 10.6562 8.3125 10.6562H13V7.83887C13 7.23828 13.4883 6.75 14.0889 6.75C14.3916 6.75 14.6797 6.87695 14.8848 7.09668Z" fill="white"/>
                </svg>

            </PaystackButton>
        )}
        {/* <button
            onClick={handlePay}
            className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
            Pay Now
        </button> */}
        </div>
    </div>
  );
};

export default Payment;
