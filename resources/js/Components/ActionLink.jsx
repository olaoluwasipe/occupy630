import { Link } from '@inertiajs/react';
import React from 'react';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
// import ActionButton from './ActionButton';

const ActionLink = ({ i, action, actions, row, deleteWithValidation, editFunction }) => {
    const ActionButton = action === 'view' ? PrimaryButton :
        action === 'edit' ? SecondaryButton : DangerButton;
    const linkProps = {
        key: i,
    };

    if (action === 'delete') {
        if (actions.deleteWithValidation) {
        linkProps.onClick = () => deleteWithValidation(row);
        } else {
        linkProps.method = 'delete';
        }
    } else {
        if(action === 'edit' && actions.editFunction) {
            linkProps.onClick = () => editFunction(row)
        } else {
            linkProps.href = `${actions.type}/${action}/${row['id']}`;
        }
        linkProps.method = 'get';
    }

    return (
        <>
            {action === 'delete' || (action === 'edit' && actions.editFunction) ? (
                <ActionButton {...linkProps}>
                    {action}
                </ActionButton>
            ) : (
                <Link {...linkProps}>
                    <ActionButton className='py-4'>
                        {action}
                    </ActionButton>
                </Link>
            )}
        </>
    );
};

export default ActionLink;
