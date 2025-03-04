import express from 'express'; // Express.js modülünü içe aktar
import { createServer as createViteServer } from 'vite'; // Vite sunucusunu oluşturmak için gerekli fonksiyonu içe aktar
import { getTodos, getCategories, getTags, getTodosByCategory, getCategory } from './controllers/index.js'; // Kontrolör fonksiyonlarını içe aktar
import fs from 'fs'; // Dosya sistemi modülünü içe aktar
import path from 'path'; // Yol modülünü içe aktar

const app = express(); // Yeni bir Express uygulaması oluştur

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: 'html' }, // Vite'ı ara yazılım modunda başlat
  });

  app.use(vite.middlewares); // Vite ara yazılımlarını kullan

  app.use('/public', express.static('public')); // Public klasörünü statik dosya olarak kullan
  app.use('/node', express.static('node_modules')); // Node_modules klasörünü statik dosya olarak kullan

  app.get('/', async (req, res) => {
    const url = req.originalUrl;
    try {
      // HTML şablonunu Vite ile dönüştür
      let template = await vite.transformIndexHtml(url, fs.readFileSync(path.resolve(__dirname, 'views/index.html'), 'utf-8'));
      // Sunucu tarafı modülünü yükle
      const html = await vite.ssrLoadModule('/src/entry-server.js');
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template); // Yanıt olarak HTML şablonunu gönder
    } catch (e) {
      vite.ssrFixStacktrace(e); // Hata yığınını düzelt
      console.error(e); // Hata mesajını konsola yazdır
      res.status(500).end(e.message); // Hata mesajını yanıt olarak gönder
    }
  });

  // Kategoriye göre yapılacakları getir
  app.get('/category/:category', async (req, res) => {
    const todos = await getTodosByCategory(req.params.category);
    const category = await getCategory(req.params.category);
    const categories = await getCategories();
    const tags = await getTags();
    res.render('index', {
      todos: todos || [],
      byCategory: category,
      categories: categories,
      tags: tags,
    });
    console.log(req.params);
  });

  // Etikete göre yapılacakları getir
  app.get('/tags/:tag', async (req, res) => {
    const todos = await getTodosByCategory(req.params.category);
    const category = await getCategory(req.params.category);
    const categories = await getCategories();
    const tags = await getTags();
    res.render('index', {
      todos: todos || [],
      byCategory: category,
      categories: categories,
      tags: tags,
    });
    console.log(req.params);
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000'); // Sunucunun çalıştığını konsola yazdır
  });
}

startServer(); // Sunucuyu başlat
