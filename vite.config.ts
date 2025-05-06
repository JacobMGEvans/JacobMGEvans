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
  // Use this to proxy HTTP and WS for presence DO
  // server: {
  //   proxy: {
  //     // proxy HTTP and WS for presence DO
  //     '/api/presence': {
  //       target: 'http://localhost:8787',
  //       changeOrigin: true,
  //       ws: true,
  //     },
  //   },
  // },
});
