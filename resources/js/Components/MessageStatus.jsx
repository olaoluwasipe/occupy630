import { FiCheck, FiCheckCircle } from 'react-icons/fi';

export default function MessageStatus({ status = 'sent' }) {
    const statusConfig = {
        sent: {
            icon: FiCheck,
            color: 'text-gray-400',
            title: 'Sent',
        },
        delivered: {
            icon: FiCheck,
            color: 'text-gray-500',
            title: 'Delivered',
        },
        read: {
            icon: FiCheckCircle,
            color: 'text-blue-500',
            title: 'Read',
        },
    };

    const config = statusConfig[status] || statusConfig.sent;
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center ${config.color}`} title={config.title}>
            <Icon className="h-3 w-3" />
        </span>
    );
}



