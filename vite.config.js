import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';
import macrosPlugin from "vite-plugin-babel-macros";
import env from 'vite-plugin-env-compatible';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin(), macrosPlugin(), env(),
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true
  }),
  NodeModulesPolyfillPlugin()],
  esbuild: {
    loader: "jsx"
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
      },
      define: {
        global: 'globalThis'
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill()
      ]
    }
  },
  resolve: {
    alias: {
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    }
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:1337/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/uploads': {
        target: 'http://localhost:1337/uploads/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, '')
      },
      '/admin': {
        target: 'http://localhost:1337/admin/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, ''),
      }
    }
  }
});