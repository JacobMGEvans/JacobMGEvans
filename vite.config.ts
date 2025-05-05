import { defineConfig } from 'vite';
import reactStack from 'hono-vite-react-stack';

export default defineConfig({
  plugins: [reactStack()],
  build: {
    rollupOptions: {
      // Mark 'cloudflare:workers' as external to avoid bundling it
      external: [
        'cloudflare:workers',
        './src/server/durable-object/presence.ts',
      ],
    },
  },
});
