import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://doqumenta.onrender.com', // tu backend
        changeOrigin: true
      }
    }
  }
});
