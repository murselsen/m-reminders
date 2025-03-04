import express from 'express'; // Express.js modülünü içe aktar
import { createServer as createViteServer } from 'vite'; // Vite sunucusunu oluşturmak için gerekli fonksiyonu içe aktar
import { getTodos, getCategories, getTags, getTodosByCategory, getCategory } from './controllers/index.js'; // Kontrolör fonksiyonlarını içe aktar
import fs from 'fs'; // Dosya sistemi modülünü içe aktar
import path from 'path'; // Yol modülünü içe aktar
import { title } from 'process';

const app = express(); // Yeni bir Express uygulaması oluştur

app.set('view engine', 'ejs'); // EJS görüntü motorunu ayarla
app.set('views', path.join(__dirname, 'views')); // Görünüm klasörünü ayarla

const vite = await createViteServer({
  server: { middlewareMode: 'html' }, // Vite'ı ara yazılım modunda başlat
});

app.use(vite.middlewares); // Vite ara yazılımlarını kullan

app.use('/public', express.static('public')); // Public klasörünü statik dosya olarak kullan
app.use('/node', express.static('node_modules')); // Node_modules klasörünü statik dosya olarak kullan

app.get('/', async (req, res) => {
  const todos = await getTodos();
  const categories = await getCategories();
  const tags = await getTags();
  res.render('index', {
    todos: todos || [],
    byCategory: {
      title: 'All Todos',
      description: 'All Todos',
    },
    categories: categories,
    tags: tags,
  });
});

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
