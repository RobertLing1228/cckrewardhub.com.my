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
    input: [
        'resources/js/app.jsx', // or .js depending on your setup
        'resources/css/app.css',
        'resources/js/Pages/ErrorPage.jsx',
    ],
    base: process.env.VITE_BASE_PATH,
});
