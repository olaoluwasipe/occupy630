import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { FiCheckCircle, FiDownload, FiHome } from 'react-icons/fi';
import formatPrice from '@/functions';
import { format } from 'date-fns';

export default function PaymentSuccess({ auth, payment }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Payment Successful" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8 text-center">
                        {/* Success Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="rounded-full bg-success-100 dark:bg-success-900/20 p-4">
                                <FiCheckCircle className="h-16 w-16 text-success-500 dark:text-success-400" />
                            </div>
                        </div>

                        {/* Success Message */}
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Payment Successful!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Your payment has been processed successfully.
                        </p>

                        {/* Payment Details Card */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8 text-left">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Payment Details
                            </h2>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {payment.reference}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                                    <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                                        {formatPrice(payment.amount)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Payment Type:</span>
                                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                                        {payment.mode}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {format(new Date(payment.created_at), 'PPpp')}
                                    </span>
                                </div>
                                
                                {payment.apartment && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Apartment:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {payment.apartment.title}
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">
                                        {payment.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={route('payment.receipt', payment.id)}>
                                <PrimaryButton className="flex items-center gap-2">
                                    <FiDownload className="h-5 w-5" />
                                    Download Receipt
                                </PrimaryButton>
                            </Link>
                            
                            <Link href={route('payment.history')}>
                                <SecondaryButton className="flex items-center gap-2">
                                    View Payment History
                                </SecondaryButton>
                            </Link>
                            
                            <Link href={route('dashboard')}>
                                <SecondaryButton variant="outline" className="flex items-center gap-2">
                                    <FiHome className="h-5 w-5" />
                                    Go to Dashboard
                                </SecondaryButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}



