import { defineConfig, loadEnv } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import packages from './package.json';
// Export the Vite configuration
export default defineConfig(({ command, mode }) => {
  return {
    // Define global variables based on the command
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    base: '/',
    // Set the root directory for the project
    root: 'src/',
    open: true,
    // Build configuration
    build: {
      sourcemap: true,
      rollupOptions: {
        // Input HTML files for Rollup
        input: glob.sync('./src/*.html'),
        output: {
          // Define manual chunks for vendor files
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // Customize entry file names
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          // Customize asset file names
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      // Output directory for the build
      outDir: '../dist',
      // Empty the output directory before building
      emptyOutDir: true,
    },
    // Server configuration
    server: {
      cors: true,
      port: 5173,
    },
    // Plugins configuration
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html', './src/**/**.js', './src/**/**.css']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
