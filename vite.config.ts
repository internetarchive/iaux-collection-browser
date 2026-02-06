import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  assetsInclude: ['**/*.jpg'],
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
