const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Node.js server is running! My name is ChatGPT');
});
app.get('/about', (req, res) => {
  res.send('This is the about page of the Node.js server. My name is ChatGPT');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});