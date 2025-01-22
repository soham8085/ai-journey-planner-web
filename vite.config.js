import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Allows using "@" as an alias for "src"
    },
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'], // Externalize React and ReactDOM if needed
    },
  },
});
