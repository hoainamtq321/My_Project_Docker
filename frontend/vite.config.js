/*  mặc định
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // cho phép truy cập từ Docker
    port: 5173,
    watch: {
      usePolling: true // giúp hot reload ổn định trong Docker
    }
  }
})