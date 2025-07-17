import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { federation } from '@module-federation/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        svgr(),
        federation({
            // A unique name for this remote application
            name: 'veilarbvisittkort',
            manifest: false,
            // The manifest file that the host will use to find the components
            filename: 'visittkortEntry.js',
            // The components you want to make available to other apps
            exposes: {
                // Alias: './path/to/component'
                './App': './src/app.jsx'
            },
            // Libraries to share with the host app to avoid duplicates
            shared: {
                react: { singleton: true },
                'react-dom': { singleton: true },
                '@navikt/ds-css': { singleton: true },
                '@navikt/aksel-icons': { singleton: true },
                '@navikt/ds-react': { singleton: true }
            }
        }),
        visualizer({ open: true })
    ],
    server: {
        open: true,
        port: 3042
    },
    optimizeDeps: {
        exclude: ['react', 'react-dom', '@navikt/ds-css', '@navikt/aksel-icons', '@navikt/ds-react']
    },
    resolve: {
        alias: {
            react: path.resolve(__dirname, 'node_modules/react'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
        }
    },
    build: {
        target: 'esnext',
        minify: false,
        modulePreload: false,
        cssCodeSplit: false,
        manifest: 'asset-manifest.json',
        outDir: 'build',
        sourcemap: true,
        rollupOptions: {
            external: ['react', 'react-dom', '@navikt/ds-css', '@navikt/aksel-icons', '@navikt/ds-react']
        }
    }
});
