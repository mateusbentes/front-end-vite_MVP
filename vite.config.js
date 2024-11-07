import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Escolha a porta que preferir
    open: true,
  },
  build: {
    cssCodeSplit: false, // Isso pode ajudar a evitar problemas de divisão de código com CSS
  },
});