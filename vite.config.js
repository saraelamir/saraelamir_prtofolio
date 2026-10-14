import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the build work on GitHub Pages, Netlify, or any static host.
export default defineConfig({
  base: './',
  plugins: [react()],
});
