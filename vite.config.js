import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/v2': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
    mimeTypes: {
      'text/css': ['css'],
    },
  },
});
