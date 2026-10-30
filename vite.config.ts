import { defineConfig } from 'vite';
import { resolve } from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

/**
 * Where an archive.org item's files are served from: its storage server and
 * folder, from the metadata API. Undefined when that doesn't answer in time.
 */
async function storageServer(
  item: string,
): Promise<{ target: string; dir: string } | undefined> {
  try {
    const response = await fetch(`https://archive.org/metadata/${item}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return undefined;
    const { server, dir } = (await response.json()) as {
      server?: unknown;
      dir?: unknown;
    };
    if (
      typeof server !== 'string' ||
      !/^ia\d+\.us\.archive\.org$/.test(server) ||
      typeof dir !== 'string' ||
      !/^\/\d+\/items\/[A-Za-z0-9._-]+$/.test(dir)
    ) {
      return undefined;
    }
    return { target: `https://${server}`, dir };
  } catch {
    return undefined;
  }
}

/**
 * The ETD index for the ?search_service=etd demo. Its files aren't
 * CORS-readable yet, so the dev server fetches them for the page.
 *
 * archive.org/download redirects every request to the item's storage server.
 * The redirect returned 502s, or took 9-14 s, on 2026-10-29, so the storage
 * server is looked up once, at startup, and read directly, as the engine does
 * outside the proxy. If the lookup fails, requests go through /download as
 * before. Restart the dev server if archive.org moves the item.
 */
async function etdIndexProxy() {
  const storage = await storageServer('etd-search');
  if (!storage) {
    console.info('etd-index: reading through archive.org/download');
    return {
      target: 'https://archive.org',
      changeOrigin: true,
      followRedirects: true,
      rewrite: (path: string) =>
        path.replace(/^\/etd-index/, '/download/etd-search'),
    };
  }
  console.info(`etd-index: reading from ${storage.target}${storage.dir}`);
  return {
    target: storage.target,
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/etd-index/, storage.dir),
  };
}

// https://vitejs.dev/config/
export default defineConfig(async () => ({
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
      // See etdIndexProxy.
      '/etd-index': await etdIndexProxy(),
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
}));
