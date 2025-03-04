import { defineConfig } from 'vite'; // Vite yapılandırma fonksiyonunu içe aktar
import ejs from 'vite-plugin-ejs'; // EJS Vite eklentisini içe aktar

export default defineConfig({
  plugins: [ejs()], // EJS eklentisini kullan
  root: './', // Proje kök dizinini belirt
  build: {
    outDir: '../dist', // Çıktı dizinini belirt
    rollupOptions: {
      input: {
        main: './views/index.ejs', // Ana giriş dosyasını belirt
      },
    },
  },
  server: {
    port: 3000, // Sunucu portunu belirt
    open: true, // Sunucu başlatıldığında tarayıcıyı otomatik aç
  },
});
