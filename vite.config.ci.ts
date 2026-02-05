/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

// https://vitest.dev/config
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
    coverage: {
      include: ['src/**/*.ts'],
    },
    watch: false,
    setupFiles: ['test/setup.ts'],
  },
});
