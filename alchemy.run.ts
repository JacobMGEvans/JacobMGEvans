import alchemy from 'alchemy';
import { Vite, KVNamespace } from 'alchemy/cloudflare';

const app = await alchemy('jacobmgevans');

export const website = await Vite('website', {
  entrypoint: './src/server/index.tsx',
  name: 'jacobmgevans-website',
  routes: [
    {
      pattern: '*jacobmgevans.com/*',
      zoneId: '31dff0f116d002d2bf0def5a7e4a852b',
    },
  ],
  bindings: {
    KV_TAILWIND: await KVNamespace('KV_TAILWIND', {
      title: 'tailwind-css-cache',
      adopt: true,
    }),
  },
  observability: {
    enabled: true,
  },
});

console.log({ url: website.url });

await app.finalize();
