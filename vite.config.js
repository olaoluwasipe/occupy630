import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-inertia': ['@inertiajs/react'],
                    'vendor-ui': ['@headlessui/react'],
                    'vendor-icons': ['react-icons'],
                    'vendor-forms': ['react-phone-input-2', 'react-step-wizard'],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', '@inertiajs/react'],
    },
});
