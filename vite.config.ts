import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alchemy from 'alchemy/cloudflare/vite';

export default defineConfig({
  plugins: [react(), alchemy()],
  build: {
    rollupOptions: {
      external: ['cloudflare:workers'],
    },
  },
});
