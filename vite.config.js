import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src/client',
    cors: true,
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/client/*.html'),
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
          outDir: '../../dist',
          emptyOutDir: true,
        },
        server: {
          proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
          secure: false,
        },
      },
      port: 3000,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html', './src/**/**.js', './src/**/**.css']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
