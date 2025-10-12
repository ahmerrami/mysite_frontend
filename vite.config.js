/* eslint-env node */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Base URL pour CloudFront
  plugins: [react()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Désactiver en production
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['bootstrap', 'react-bootstrap', 'mdb-react-ui-kit']
        }
      },
    },
    // Utiliser esbuild pour la minification (plus rapide que terser)
    minify: 'esbuild'
  },
  // Configuration pour les headers de cache
  server: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
});
