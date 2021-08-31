/* eslint-disable import/no-extraneous-dependencies */

import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import { resolve } from 'path';

const PROD = process.env.NODE_ENV === 'production';
const PRE_RENDER = process.env.PRE_RENDER === 'true';

const THEME_DIR = resolve(__dirname, 'theme');
const SRC_DIR = resolve(THEME_DIR, 'src');
const OUT_DIR = resolve(THEME_DIR, 'napari/static/dist');

export default defineConfig({
  // Set theme directory as the root context.
  root: THEME_DIR,

  plugins: [
    // Plugin to enable fast refresh in development mode:
    // https://www.netlify.com/blog/2020/12/03/what-is-react-fast-refresh/
    reactRefresh(),
  ],

  resolve: {
    alias: {
      // Allow importing 'theme/src/*' modules using '@/*'.
      '@': SRC_DIR,
    },
  },

  server: {
    // Enable CORS so that the Jupyter Book dev server can fetch the JS bundle
    // from the Vite dev server.
    cors: true,
  },

  esbuild: {
    // Inject React import at the top so that components don't have to import it
    // manually. Non-component files will automatically have the import removed
    // thanks to tree shaking.
    jsxInject: "import React from 'react';",
  },

  build: {
    // Enable sourcemaps for development.
    sourcemap: !PROD,

    // Obfuscate and minify code in production.
    // minify: PROD && 'terser',

    // Output to napari theme static files directory so that Jupyter Book copies
    // over the files during the build.
    outDir: OUT_DIR,

    lib: {
      name: 'napari_theme',

      // Entry file for the application, or the app rendering module for pre-rendering.
      entry: resolve(
        SRC_DIR,
        PRE_RENDER ? 'renderAppToString.tsx' : 'main.tsx',
      ),

      formats: PRE_RENDER
        ? // Output CJS for pre-rendering so that Node.js scripts can import it.
          ['cjs']
        : // Output ES modules for modern browsers and IIFEs for older browsers.
          ['es', 'iife'],
    },
  },
});
