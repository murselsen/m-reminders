import express from 'express';

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.get('/api', (req, res) => {
  res.json('RestApi World! Welcome to the Vite Server');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
