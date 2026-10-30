// collection-browser's own Vite config, minus the self-signed HTTPS plugin,
// so the demo runs over plain http://localhost and can read an index served
// by serve-index.mjs without mixed-content errors.
//
// Usage: pnpm exec vite --config tools/static-index/vite.http.config.ts
import { fileURLToPath } from 'node:url';
import type { ConfigEnv } from 'vite';
import repoConfig from '../../vite.config';

const root = fileURLToPath(new URL('../..', import.meta.url));

export default async (env: ConfigEnv) => {
  const config =
    typeof repoConfig === 'function' ? await repoConfig(env) : repoConfig;
  const plugins = (config.plugins ?? [])
    .flat()
    .filter(
      plugin =>
        !String((plugin as { name?: string } | null)?.name ?? '').includes(
          'basic-ssl',
        ),
    );
  return {
    ...config,
    root,
    plugins,
    server: { ...(config.server ?? {}), host: 'localhost', https: undefined },
  };
};
