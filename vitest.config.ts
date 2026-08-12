import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    test: {
        environment: 'jsdom'
    }
});
