import express from 'express';
import { getTodos } from './controllers/index.js';
const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/todos', async (req, res) => {
  console.time('api/todos');
  // Return a list of tasks
  console.log('Get Todos', await getTodos());
  getTodos().then(todos => {
    res.json(todos);
  });
  console.timeEnd('api/todos');
});

app.post('/api/tasks', (req, res) => {
  // Create a new task
  res.status(201).json(req.body);
});

app.put('/api/tasks/:id', (req, res) => {
  // Update a task
  res.json(req.body);
});

app.delete('/api/tasks/:id', (req, res) => {
  // Delete a task
  res.status(204).send();
});

app.listen(5173, () => {
  console.log(`Server is running on http://localhost:${5173}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
