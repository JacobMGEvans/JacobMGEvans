import reactStack from 'hono-vite-react-stack';
import { defineConfig } from 'vite';
import { defaultOptions as buildDefaultOptions } from '@hono/vite-build/cloudflare-workers';

export default defineConfig({
  plugins: [
    reactStack({
      buildPluginOptions: {
        entryContentAfterHooks: [
          ...buildDefaultOptions.entryContentAfterHooks,
          () =>
            `export { PresenceDO } from "/src/server/durable-objects/presence"`,
        ],
        entryContentDefaultExportHook:
          buildDefaultOptions.entryContentDefaultExportHook,
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ['cloudflare:workers'],
    },
  },
  server: {
    proxy: {
      '/api/presence': {
        target: 'ws://localhost:8787',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
