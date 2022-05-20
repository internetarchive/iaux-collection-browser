import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    outDir: 'build',
    lib: {
      entry: resolve(__dirname, 'src/app-root.js'),
      formats: ['es'],
    },
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    host: true,
    port: 8080,
    open: true,
    cors: true,
  },
});
