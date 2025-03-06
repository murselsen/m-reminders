import express from 'express';
import {
  getCategories,
  getTodos,
  getTags,
  getTodosByCategory,
} from './controllers/index.js';

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.json('RestApi World! Welcome to the Vite Server');
});
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the test endpoint!' });
});
app.get('/api/categories', (req, res) => {
  getCategories().then(categories => {
    res.json(categories);
  });
});

app.get('/api/todos', (req, res) => {
  getTodos().then(todoData => {
    console.log('Todo List:', todoData);
    res.json(todoData);
  });
});

app.get('/api/tags', (req, res) => {
  getTags().then(tagData => {
    console.log('Tag List:', tagData);
    res.json(tagData);
  });
});

app.get('/api/todos/category/:categoryTitle', (req, res) => {
  getTodosByCategory(req.params.categoryTitle).then(todoData => {
    console.log('By Category Todo List:', todoData);
    res.json(todoData);
  });
});

app.get('/api/todos/tag/:tagTitle', (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
