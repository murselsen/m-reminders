import express from 'express';
import { getTodos, getCategories, getTags } from './controllers/index.js';
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/node', express.static('node_modules'));

app.get('/', async (req, res) => {
  const todos = await getTodos();
  const categories = await getCategories();
  const tags = await getTags();
  res.render('index', {
    todos: todos,
    categories: categories,
    tags: tags,
  });
});

app.get('index?category=', async (req, res) => {});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
