import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { FiBell, FiCheck, FiX } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { FiInbox } from 'react-icons/fi';

export default function NotificationCenter({ user, initialUnreadCount = 0 }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('all'); // all, unread, read
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen, filter]);

    useEffect(() => {
        if (window.Echo && user) {
            // Listen for new notifications
            window.Echo.private(`user.${user.id}`)
                .notification((notification) => {
                    setNotifications((prev) => [notification, ...prev]);
                    setUnreadCount((prev) => prev + 1);
                });

            // Listen for notification updates
            window.Echo.private(`user.${user.id}`)
                .listen('.notification.read', (data) => {
                    setNotifications((prev) =>
                        prev.map((notif) =>
                            notif.id === data.notification.id
                                ? { ...notif, read_at: data.notification.read_at }
                                : notif
                        )
                    );
                    setUnreadCount((prev) => Math.max(0, prev - 1));
                });

            return () => {
                window.Echo.leave(`user.${user.id}`);
            };
        }
    }, [user]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/notifications?filter=${filter}`);
            const data = await response.json();
            setNotifications(data.data || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await fetch('/notifications/unread-count');
            const data = await response.json();
            setUnreadCount(data.count || 0);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    useEffect(() => {
        // Fetch unread count periodically
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000); // Every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(`/notifications/${notificationId}/read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
            });

            if (response.ok) {
                setNotifications((prev) =>
                    prev.map((notif) =>
                        notif.id === notificationId ? { ...notif, read_at: new Date().toISOString() } : notif
                    )
                );
                setUnreadCount((prev) => Math.max(0, prev - 1));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await fetch('/notifications/read-all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
            });

            if (response.ok) {
                setNotifications((prev) =>
                    prev.map((notif) => ({ ...notif, read_at: notif.read_at || new Date().toISOString() }))
                );
                setUnreadCount(0);
            }
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            const response = await fetch(`/notifications/${notificationId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
            });

            if (response.ok) {
                setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId));
                const deletedNotif = notifications.find((n) => n.id === notificationId);
                if (deletedNotif && !deletedNotif.read_at) {
                    setUnreadCount((prev) => Math.max(0, prev - 1));
                }
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const filteredNotifications = notifications.filter((notification) => {
        if (filter === 'unread') return !notification.read_at;
        if (filter === 'read') return notification.read_at;
        return true;
    });

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Bell */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                aria-label="Notifications"
            >
                <FiBell className="h-6 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-error-500 text-xs font-bold text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-strong border border-gray-200 dark:border-gray-700 z-50 max-h-[600px] flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Notifications
                        </h3>
                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <SecondaryButton
                                    size="sm"
                                    onClick={markAllAsRead}
                                    className="text-xs"
                                >
                                    Mark all read
                                </SecondaryButton>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <FiX className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 text-sm rounded ${
                                filter === 'all'
                                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-3 py-1 text-sm rounded ${
                                filter === 'unread'
                                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            Unread ({unreadCount})
                        </button>
                        <button
                            onClick={() => setFilter('read')}
                            className={`px-3 py-1 text-sm rounded ${
                                filter === 'read'
                                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            Read
                        </button>
                    </div>

                    {/* Notifications List */}
                    <div className="flex-1 overflow-y-auto">
                        {isLoading ? (
                            <div className="flex justify-center p-8">
                                <LoadingSpinner />
                            </div>
                        ) : filteredNotifications.length > 0 ? (
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                                            !notification.read_at
                                                ? 'bg-primary-50/50 dark:bg-primary-900/10'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    {notification.data?.message || notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {formatDistanceToNow(new Date(notification.created_at), {
                                                        addSuffix: true,
                                                    })}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {!notification.read_at && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="p-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                                                        title="Mark as read"
                                                    >
                                                        <FiCheck className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="p-1 text-gray-400 hover:text-error-600 dark:hover:text-error-400"
                                                    title="Delete"
                                                >
                                                    <FiX className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={FiInbox}
                                title="No Notifications"
                                description={
                                    filter === 'unread'
                                        ? "You're all caught up! No unread notifications."
                                        : 'No notifications found.'
                                }
                                className="py-12"
                            />
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <Link
                            href={route('notifications.index')}
                            className="block text-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                        >
                            View All Notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

