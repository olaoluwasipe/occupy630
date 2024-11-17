import { format } from 'date-fns';
import React, { useState } from 'react';
import IconTextInput from './IconTextInput';
import ActionLink from './ActionLink';
import { FaSearch } from 'react-icons/fa';
import formatPrice from '@/functions';
import parse from 'html-react-parser'

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value?.[key], obj);
};

const formatValue = (value, formatter) => {
    if (!value || !formatter) return value;

    try {
        switch (formatter) {
            case 'date':
                return format(new Date(value), 'd MMM, yyyy');
            case 'datetime':
                return format(new Date(value), 'd MMM, yyyy | hh:mm a');
            case 'money':
                return formatPrice(value);
            case 'tag':
                switch (value) {
                    case 'pending':
                    case 'processing':
                        return <span className="bg-yellow-500 p-2 rounded text-sm text-white">{value}</span>;
                    case 'approved':
                    case 'successful':
                    case 'completed':
                        return <span className="bg-green-500 p-2 rounded text-sm text-white">{value}</span>;
                    case 'rejected':
                    case 'failed':
                    case 'cancelled':
                    case 'expired':
                    case 'declined':
                        return <span className="bg-red-500 p-2 rounded text-sm text-white">{value}</span>;
                    default:
                        return value;
                }
            case 'html':
                return parse(value);
            // case 'link':
            //     return <a href={`/${type}/${value}`}>{value}</a>
            case 'image':
                return <img src={value} alt="Image" className="w-10 h-10 object-cover rounded-full" />;
            default:
                return value;
        }
    } catch (error) {
        return value; // Fallback if formatting fails
    }

};

const Table = ({ data, columnsToShow = [], actions, rowsPerPage = 10, searchable = false, type=null, clickable }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    if (data.length === 0) {
        return (
            <div className="relative overflow-x-auto sm:rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-center">There are no items in this table</p>
            </div>
        );
    }

    const filteredColumns = columnsToShow.length
        ? columnsToShow.map((col) =>
            typeof col === 'string' ? { key: col, label: col } : col
        )
        : Object.keys(data[0]).map((key) => ({ key, label: key }));

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const filteredData = data
        .slice(startIndex, endIndex)
        .filter((row) =>
            filteredColumns.some((col) =>
                getNestedValue(row, col.key)?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {searchable && (
                <IconTextInput
                    icon={<FaSearch size={17} />}
                    style={{ borderRadius: '900px' }}
                    rounded="rounded-full"
                    className="border border-gray-400 bg-slate-50 mb-6 rounded-full"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            )}
            <table className="w-full text-sm text-left overflow-auto rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {filteredColumns.map(({ key, label }) => (
                            <th key={key} scope="col" className="px-6 py-3">
                                {label}
                            </th>
                        ))}
                        {actions && <th scope="col" className="px-6 py-3">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex} onClick={() => clickable?.(row) || null} className={`odd:bg-white text-nowrap even:bg-gray-50 border-b ${clickable ? 'cursor-pointer' : ''}`}>
                            {filteredColumns.map(({ key, formatter }) => (
                                <td key={key} className="px-6 py-4">
                                    {formatValue(getNestedValue(row, key), formatter)}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-6 py-4 flex gap-3">
                                    {(row.status === 'approved' || row.status === 'declined' || row.status === 'failed' || row.status === 'completed') ? (
                                        <span className="text-green-500 capitalize">
                                            {row.status} On: {formatValue(row.updated_at, 'datetime')}
                                        </span>
                                    ) : (
                                        <>
                                            {/* Render default actions */}
                                            {actions.defaultActions &&
                                                actions.defaultActions.map((action, i) => (
                                                    <ActionLink
                                                        key={`${i}-${action}`}
                                                        action={action}
                                                        row={row}
                                                        defaultActions={actions.defaultActions}
                                                    />
                                                ))}

                                            {/* Render custom buttons */}
                                            {actions.buttons &&
                                                actions.buttons.map((button, i) => (
                                                    <ActionLink key={`${i}-${button.label}`} button={button} row={row} />
                                                ))}
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length > rowsPerPage && (
                <div className="flex justify-between items-center p-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700 dark:text-gray-400">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Table;
