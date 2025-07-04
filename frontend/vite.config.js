import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Optional: default CRA port
    proxy: {
      // Proxy API requests to backend server
      '/api': 'http://localhost:5000'
    }
  }
});
