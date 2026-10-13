import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    // Split vendor libraries from app code so browsers can cache them separately.
    // Vendor chunks rarely change → users re-download only changed app chunks.
    rollupOptions: {
      output: {
        // manualChunks as a function — type-safe form required by Vite's TS types
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion'))      return 'vendor-motion';
            if (id.includes('@react-oauth') || id.includes('google-auth-library')) return 'vendor-google-auth';
            if (id.includes('react-hot-toast'))    return 'vendor-toast';
            if (id.includes('lucide-react'))       return 'vendor-icons';
            if (id.includes('axios'))              return 'vendor-axios';
            if (
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('/react/')
            ) return 'vendor-react';
          }
        },
      },
    },
  },
})
