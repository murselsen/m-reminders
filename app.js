const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

const categories = require('./db/categories.json');

app.use('/public', express.static('public'));
app.use('/node', express.static('node_modules'));

app.get('/', (req, res) => {
  console.log(categories);

  res.render('index', { categories });
});

app.listen(port, () => {
  console.log('Listening');
  console.log(`Listening on port ${port}`);
});
