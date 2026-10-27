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
    proxy: {
      // The ETD index for the ?search_service=etd demo. Its files aren't
      // CORS-readable yet, so the dev server fetches them for the page.
      // archive.org/download redirects to whichever server holds the item.
      '/etd-index': {
        target: 'https://archive.org',
        changeOrigin: true,
        followRedirects: true,
        rewrite: path => path.replace(/^\/etd-index/, '/download/etd-search'),
      },
    },
  },
  plugins: [
    basicSsl({
      name: 'archive-dev',
      domains: ['local.archive.org'],
    }),
  ],
});
