import { defineConfig } from 'vite';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    build: {
        outDir: 'boop',
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            formats: ['es'],
        },
    },
});
//# sourceMappingURL=vite.prepare.config.js.map