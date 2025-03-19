import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,  // Ensure the port is dynamic for Render
    host: true,  // Make sure the app listens to all network interfaces
  },
  preview: {
    allowedHosts: ['chefclaude-j015.onrender.com', 'localhost'],  // Add Render URL and localhost
  },
})
