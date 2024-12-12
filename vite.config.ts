import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import path from 'path';

export default defineConfig({
  plugins: [react(), macrosPlugin()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  css: {
    modules: {
      scopeBehaviour: 'local'
    },
    preprocessorOptions: {
      scss: {}
    }
  },
  server: {
    port: 3030
  },
  preview: {
    port: 8080
  }
});
