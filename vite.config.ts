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
      // Any other item's static index, for the demo's `etd_item=<id>`.
      // Only an identifier and no `..` segment match, so a path can't climb
      // out of /download/<id>/.
      '^/item-index/[A-Za-z0-9][A-Za-z0-9._-]*/(?!(.*/)?\\.\\.(/|$))': {
        target: 'https://archive.org',
        changeOrigin: true,
        followRedirects: true,
        rewrite: path => path.replace(/^\/item-index\//, '/download/'),
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
