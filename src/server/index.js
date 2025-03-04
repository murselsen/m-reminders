import express from 'express';
const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/tasks', (req, res) => {
  // Return a list of tasks
  res.json([]);
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
