import { defineConfig } from 'vite'; // Vite yapılandırma fonksiyonunu içe aktar

import { glob } from 'glob';
import { ViteEjsPlugin } from 'vite-plugin-ejs'; // EJS Vite eklentisini içe aktar
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    base: '/',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: './',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      ViteEjsPlugin(),
      FullReload(['./**/**.ejs', './**/**.js', './**/**.css']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
