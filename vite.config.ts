import { defineConfig } from 'vite';
import reactStack from 'hono-vite-react-stack';

export default defineConfig({
  plugins: [
    reactStack({
      clientEntry: './src/client/index.tsx',
      cssEntry: './src/style.css',
    }),
  ],
});
