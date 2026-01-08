import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { FiDownload, FiFilter, FiSearch } from 'react-icons/fi';
import formatPrice from '@/functions';
import { format } from 'date-fns';
import EmptyState from '@/Components/EmptyState';
import { FiCreditCard } from 'react-icons/fi';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function PaymentHistory({ auth, payments: initialPayments, pagination }) {
    const [payments, setPayments] = useState(initialPayments || []);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const filteredPayments = payments.filter((payment) => {
        const matchesSearch = 
            payment.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.apartment?.title?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
        const matchesType = typeFilter === 'all' || payment.mode === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusBadge = (status) => {
        const statusClasses = {
            success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
            pending: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
            failed: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Payment History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Payment History
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            View and manage all your payment transactions
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-soft p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <TextInput
                                    type="text"
                                    placeholder="Search by reference or apartment..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            
                            <SelectInput
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="success">Success</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </SelectInput>
                            
                            <SelectInput
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="initial">Initial</option>
                                <option value="rent">Rent</option>
                                <option value="deposit">Deposit</option>
                            </SelectInput>
                        </div>
                    </div>

                    {/* Payments List */}
                    {filteredPayments.length > 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-soft overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Reference
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Apartment
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredPayments.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {payment.reference}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        {payment.apartment?.title || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {formatPrice(payment.amount)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white capitalize">
                                                        {payment.mode}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(payment.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {format(new Date(payment.created_at), 'MMM dd, yyyy')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {payment.status === 'success' && (
                                                        <Link
                                                            href={route('payment.receipt', payment.id)}
                                                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1"
                                                        >
                                                            <FiDownload className="h-4 w-4" />
                                                            Receipt
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.last_page > 1 && (
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing {pagination.current_page} of {pagination.last_page} pages
                                    </div>
                                    <div className="flex gap-2">
                                        {pagination.current_page > 1 && (
                                            <Link
                                                href={`/payment/history?page=${pagination.current_page - 1}`}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {pagination.current_page < pagination.last_page && (
                                            <Link
                                                href={`/payment/history?page=${pagination.current_page + 1}`}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <EmptyState
                            icon={FiCreditCard}
                            title="No Payments Found"
                            description="You haven't made any payments yet. When you do, they'll appear here."
                            actionLabel="Browse Apartments"
                            action={() => window.location.href = route('apartments')}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}



