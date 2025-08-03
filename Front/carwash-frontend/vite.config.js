import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    fs: {
      strict: false,
    },
    // Proxy only for development
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': {
        target: 'https://bookingbackend-jufl.onrender.com',
        changeOrigin: true,
        secure: false
      }
    } : undefined
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'gsap']
        }
      }
    },
    // Copy _redirects file for SPA routing
    copyPublicDir: true
  },
  plugins: [react(), tailwindcss()],
})
