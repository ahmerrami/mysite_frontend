import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`, // Génère les fichiers d’entrée en `.js`
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
    },
  },
});
