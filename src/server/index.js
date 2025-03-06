import express from 'express';
import { getCategories, getTodos, getTags } from './controllers/index.js';

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
  res.json({ message: 'Hello from the tags endpoint!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
