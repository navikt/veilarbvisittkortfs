import { execSync } from 'child_process';

/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    // Make sure release is set client-side, automatic release tagging did not work
    process.env.VITE_SENTRY_RELEASE = execSync('git rev-parse HEAD').toString().trim();

    return {
        build: {
            manifest: 'asset-manifest.json',
            outDir: 'build',
            sourcemap: true
        },
        plugins: [react(), svgr()],
        server: {
            port: 3000
        }
    };
});
