import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';
import IconTextInput from './IconTextInput';
import ActionLink from './ActionLink';

const Table = ({ data, columnsToShow = [], actions, rowsPerPage = 10, searchable = false }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const [currentPage, setCurrentPage] = useState(1);

    if (data.length === 0) {
        return (
            <div className="relative overflow-x-auto sm:rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-center">There are no {actions.type} in this table</p>
            </div>
        );
    }

    const mainColumns = Object.keys(data[0]);
    const filteredColumns = columnsToShow.filter(column => data.some(row => row.hasOwnProperty(column)));
    const columns = filteredColumns.length ? filteredColumns : mainColumns;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = data.slice(startIndex, endIndex);
    const filteredData = currentData.filter((data) =>
        data?.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
                    icon=<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.625 6.99905C13.625 8.43321 13.1595 9.75802 12.3752 10.8329L16.3309 14.7917C16.7215 15.1822 16.7215 15.8165 16.3309 16.2071C15.9403 16.5976 15.306 16.5976 14.9155 16.2071L10.9598 12.2483C9.88497 13.0357 8.56016 13.4981 7.126 13.4981C3.5359 13.4981 0.626953 10.5891 0.626953 6.99905C0.626953 3.40895 3.5359 0.5 7.126 0.5C10.7161 0.5 13.625 3.40895 13.625 6.99905ZM7.126 11.4984C7.71686 11.4984 8.30194 11.382 8.84782 11.1559C9.39371 10.9298 9.88971 10.5984 10.3075 10.1806C10.7253 9.76276 11.0567 9.26676 11.2828 8.72087C11.509 8.17499 11.6253 7.58991 11.6253 6.99905C11.6253 6.40819 11.509 5.82311 11.2828 5.27722C11.0567 4.73134 10.7253 4.23534 10.3075 3.81753C9.88971 3.39973 9.39371 3.06831 8.84782 2.8422C8.30194 2.61609 7.71686 2.49971 7.126 2.49971C6.53514 2.49971 5.95006 2.61609 5.40418 2.8422C4.85829 3.06831 4.36229 3.39973 3.94449 3.81753C3.52668 4.23534 3.19526 4.73134 2.96915 5.27722C2.74304 5.82311 2.62666 6.40819 2.62666 6.99905C2.62666 7.58991 2.74304 8.17499 2.96915 8.72087C3.19526 9.26676 3.52668 9.76276 3.94449 10.1806C4.36229 10.5984 4.85829 10.9298 5.40418 11.1559C5.95006 11.382 6.53514 11.4984 7.126 11.4984Z" fill="#717171"/>
                        </svg>
                    style={{borderRadious: '900px'}}
                    rounded="rounded-full"
                    className='border border-gray-400 bg-slate-50 mb-6 rounded-full'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        {columns.map(column => (
                            <th key={column} scope="col" className="px-6 py-3">
                                {column}
                            </th>
                        ))}
                        {actions && (
                            <th scope="col" className="px-6 py-3">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-white even:bg-gray-50  border-b">
                            {columns.map(column => (
                                <td key={column} className="px-6 py-4">{
                                    column.includes('image') ?

                                    <img src={row[column] ? `/images/${row[column].path}` : 'https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg'} alt={row[column]} className="w-16 h-16" />

                                    : row[column]

                                    }</td>
                            ))}
                            {actions && (
                                <td className="px-6 py-4 flex gap-3">
                                    {actions.active.map((action, i) => (
                                        <ActionLink
                                            key={`${i}-${action}`}
                                            i={i}
                                            action={action}
                                            actions={actions}
                                            row={row}
                                            editFunction={actions.editFunction}
                                            deleteWithValidation={actions.deleteWithValidation}
                                        />
                                    ))}
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
                <span className='text-gray-700 dark:text-gray-400'>Page {currentPage} of {totalPages}</span>
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
