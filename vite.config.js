/* eslint-env node */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',  // Remplacez par le nom de votre dépôt
  plugins: [react()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],  // Inclut l'extension `.jsx`
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,       // Fichiers JS générés
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
    },
  },
});
