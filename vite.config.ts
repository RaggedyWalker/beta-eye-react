import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/eye',
  server: {
    port: 18888,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/betaeye': {
        target: 'http://localhost:13000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/betaeye/, ''),
      },
    },
  },
  plugins: [
    react(),
    svgr(),
    viteCompression({
      algorithm: 'gzip',
      deleteOriginFile: false, // 不删除源文件
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'eye',
  },
});
