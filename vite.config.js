import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',   // Output directory for the build files
    sourcemap: true,   // Generate source maps for debugging
    minify: 'esbuild', // Minification tool to use
  },
})
