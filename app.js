import express from 'express';
import { getCategories, getTags } from './controllers/index.js';
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/node', express.static('node_modules'));

app.get('/', async (req, res) => {
  const categories = await getCategories();
  const tags = await getTags();
  res.render('index', {
    categories: categories,
    tags: tags,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
