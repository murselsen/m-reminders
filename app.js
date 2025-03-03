import express from 'express';
import { getCategories } from './controllers/index.js';
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use('/node', express.static('node_modules'));

app.get('/', async (req, res) => {
  const categories = await getCategories();
  res.render('index', {
    categories: categories,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
