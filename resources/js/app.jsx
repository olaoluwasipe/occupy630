import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './Contexts/ThemeContext';
import LoadingSpinner from './Components/LoadingSpinner';

import 'react-toastify/dist/ReactToastify.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Inertia already handles code splitting via import.meta.glob
        // This ensures proper lazy loading
        return resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Render App with ThemeProvider and Toaster
        root.render(
            <ThemeProvider>
                <App {...props} />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#003366',
        showSpinner: true,
    },
});
