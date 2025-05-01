import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import reactStack from 'hono-vite-react-stack';

export default defineConfig({
  plugins: [tailwindcss(), cloudflare(), reactStack()],
});
