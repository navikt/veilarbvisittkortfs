import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), svgr()],
    server: {
        open: true,
        port: 3042
    },
    build: {
        manifest: 'asset-manifest.json',
        outDir: 'build',
        sourcemap: true
    }
});
