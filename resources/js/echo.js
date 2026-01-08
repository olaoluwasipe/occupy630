import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Only initialize Echo if Pusher key is configured
const pusherKey = import.meta.env.VITE_PUSHER_APP_KEY;

if (pusherKey) {
    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: pusherKey,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
        wsHost: import.meta.env.VITE_PUSHER_HOST || `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1'}.pusher.com`,
        wsPort: import.meta.env.VITE_PUSHER_PORT || 80,
        wssPort: import.meta.env.VITE_PUSHER_PORT || 443,
        forceTLS: (import.meta.env.VITE_PUSHER_SCHEME || 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
        encrypted: true,
        authEndpoint: '/broadcasting/auth',
        auth: {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            },
        },
    });
} else {
    // Create a mock Echo object to prevent errors when Echo is accessed
    const createMockChannel = () => ({
        listen: (event, callback) => {
            // Return an object with stop method for cleanup
            return { stop: () => {} };
        },
        notification: (callback) => {
            // Return an object with stop method for cleanup
            return { stop: () => {} };
        },
        whisper: (event, data) => {
            // Mock whisper method - does nothing
        },
        listenForWhisper: (event, callback) => {
            // Return an object with stop method for cleanup
            return { stop: () => {} };
        },
        subscribed: (callback) => {
            // Mock subscribed callback
        },
        unsubscribe: () => {
            // Mock unsubscribe
        },
    });

    window.Echo = {
        channel: createMockChannel,
        private: createMockChannel,
        join: () => ({
            listen: () => ({ stop: () => {} }),
            here: () => {},
            joining: () => {},
            leaving: () => {},
        }),
        leave: () => {},
        disconnect: () => {},
    };
    console.warn('Pusher is not configured. Real-time features will be disabled.');
}
