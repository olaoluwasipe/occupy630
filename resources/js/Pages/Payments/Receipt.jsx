import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import formatPrice from '@/functions';
import { format } from 'date-fns';

export default function PaymentReceipt({ auth, payment }) {
    const receiptRef = useRef();

    const handlePrint = () => {
        const printContent = receiptRef.current?.innerHTML || '';
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Receipt - ${payment.reference}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .receipt { max-width: 800px; margin: 0 auto; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Receipt - ${payment.reference}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Action Buttons */}
                    <div className="mb-6 flex justify-end gap-4">
                        <PrimaryButton onClick={handlePrint} className="flex items-center gap-2">
                            <FiPrinter className="h-5 w-5" />
                            Print Receipt
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={() => {
                                // Trigger download
                                const printWindow = window.open('', '_blank');
                                printWindow.document.write(`
                                    <html>
                                        <head>
                                            <title>Receipt - ${payment.reference}</title>
                                            <style>
                                                body { font-family: Arial, sans-serif; padding: 20px; }
                                                .receipt { max-width: 800px; margin: 0 auto; }
                                                .header { text-align: center; margin-bottom: 30px; }
                                                .details { margin: 20px 0; }
                                                .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
                                                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                                                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                                                .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
                                            </style>
                                        </head>
                                        <body>
                                            ${receiptRef.current?.innerHTML || ''}
                                        </body>
                                    </html>
                                `);
                                printWindow.document.close();
                                printWindow.print();
                            }}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <FiDownload className="h-5 w-5" />
                            Download PDF
                        </PrimaryButton>
                    </div>

                    {/* Receipt Content */}
                    <div ref={receiptRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8">
                        {/* Header */}
                        <div className="text-center mb-8 border-b pb-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Payment Receipt
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Transaction Reference: <span className="font-mono font-semibold">{payment.reference}</span>
                            </p>
                        </div>

                        {/* Company/App Info */}
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                                Occupy630
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Apartment Rental Platform
                            </p>
                        </div>

                        {/* Payment Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Payment Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {payment.reference}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Date:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {format(new Date(payment.created_at), 'PPpp')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                        <span className="font-medium text-success-600 dark:text-success-400 capitalize">
                                            {payment.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                                            {payment.method || 'Paystack'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Customer Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Name:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {payment.user?.fullname || payment.user?.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {payment.user?.email}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Apartment Details */}
                        {payment.apartment && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Apartment Details
                                </h3>
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                    <p className="font-medium text-gray-900 dark:text-white mb-2">
                                        {payment.apartment.title}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {payment.apartment.address}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Payment Breakdown */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Payment Breakdown
                            </h3>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Description
                                        </th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-white capitalize">
                                            {payment.mode} Payment
                                        </td>
                                        <td className="py-3 px-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                                            {formatPrice(payment.amount)}
                                        </td>
                                    </tr>
                                    {payment.meta?.prices && Object.entries(payment.meta.prices).map(([key, value], index) => (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {key.replace(/_/g, ' ')}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-600 dark:text-gray-400">
                                                {formatPrice(value)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="py-4 px-4 text-lg font-bold text-gray-900 dark:text-white">
                                            Total
                                        </td>
                                        <td className="py-4 px-4 text-lg font-bold text-right text-primary-600 dark:text-primary-400">
                                            {formatPrice(payment.amount)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
                            <p>Thank you for your payment!</p>
                            <p className="mt-2">This is an official receipt for your records.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

