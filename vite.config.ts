import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        svgr(),
        federation({
            // A unique name for this remote application
            name: 'veilarbvisittkort',
            // The manifest file that the host will use to find the components
            filename: 'visittkortEntry.js',
            // The components you want to make available to other apps
            exposes: {
                // Alias: './path/to/component'
                './App': './src/app.jsx'
            },
            // Libraries to share with the host app to avoid duplicates
            shared: ['react', 'react-dom', '@navikt/ds-css', '@navikt/aksel-icons', '@navikt/ds-react']
        })
    ],
    server: {
        open: true,
        port: 3042
    },
    optimizeDeps: {
        exclude: ['react', 'react-dom', '@navikt/ds-css', '@navikt/aksel-icons', '@navikt/ds-react']
    },
    build: {
        target: 'esnext',
        minify: false,
        modulePreload: false,
        cssCodeSplit: false,
        manifest: 'asset-manifest.json',
        outDir: 'build',
        sourcemap: true,
        rollupOptions: { external: ['react', 'react-dom', '@navikt/ds-css', '@navikt/aksel-icons', '@navikt/ds-react'] }
    }
});
