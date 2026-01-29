import { defineConfig } from 'vite';
import { resolve } from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    outDir: 'ghpages',
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    host: 'local.archive.org',
    port: 8080,
    open: true,
    cors: true,
  },
  plugins: [
    basicSsl({
      name: 'archive-dev',
      domains: ['local.archive.org'],
    }),
  ],
});
