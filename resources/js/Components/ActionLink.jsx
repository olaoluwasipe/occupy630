import React from 'react';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';

const ActionLink = ({ button, row, action, defaultActions }) => {
    const { label, type, onClick } = button || {};

    const defaultHandlers = {
        view: {
            label: 'View',
            type: 'primary',
            onClick: (row) => console.log(`Viewing ${row.id}`),
        },
        edit: {
            label: 'Edit',
            type: 'secondary',
            onClick: (row) => console.log(`Editing ${row.id}`),
        },
        delete: {
            label: 'Delete',
            type: 'danger',
            onClick: (row) => confirm(`Are you sure you want to delete ${row.id}?`),
        },
    };

    // Use default action if button is null or undefined
    const resolvedAction = button || defaultHandlers[action];
    if (!resolvedAction) return null;

    const ButtonComponent =
        resolvedAction.type === 'primary'
            ? PrimaryButton
            : resolvedAction.type === 'secondary'
            ? SecondaryButton
            : DangerButton;

    const handleClick = () => resolvedAction.onClick(row);

    return (
        <ButtonComponent onClick={handleClick}>
            {resolvedAction.label}
        </ButtonComponent>
    );
};

export default ActionLink;
