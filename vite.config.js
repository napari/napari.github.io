/* eslint-disable import/no-extraneous-dependencies */

import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import { resolve } from 'path';

const PROD = process.env.NODE_ENV === 'production';
const THEME_DIR = resolve(__dirname, 'theme');
const SRC_DIR = resolve(THEME_DIR, 'src');
const PRE_RENDER = process.env.PRE_RENDER === 'true';

export default defineConfig({
  root: THEME_DIR,
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
  server: {
    cors: true,
  },
  esbuild: {
    jsxInject: "import React from 'react';",
  },
  build: {
    sourcemap: !PROD,
    // minify: PROD && 'terser',
    minify: false,
    outDir: resolve(THEME_DIR, 'napari/static/dist'),
    lib: {
      entry: resolve(
        SRC_DIR,
        PRE_RENDER ? 'renderAppToString.tsx' : 'main.tsx',
      ),
      formats: PRE_RENDER ? ['cjs'] : ['es', 'iife'],
      name: 'theme',
    },
  },
});
