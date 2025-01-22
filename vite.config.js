import path from 'path'; // Import path module
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Resolve paths using path module
    },
  },
  build: {
    // No need to externalize React anymore
  },
});
