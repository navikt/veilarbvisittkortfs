import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwind from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [tailwind(), react(), svgr()],
    server: {
        open: true,
        port: 3042
    },
    build: {
        target: 'esnext',
        manifest: 'asset-manifest.json',
        outDir: 'build',
        sourcemap: true
    }
});
