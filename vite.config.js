import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,  // Render ke liye dynamic port
    host: true,  // Yeh ensure karega ki app sabhi network interfaces pe listen kare
  },
})
