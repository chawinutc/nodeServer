const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const url = require('url');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  console.log('path:', path.join(__dirname, 'index.html'));
 // res.send('Hello, Node.js server is running! My name is ChatGPT');
 res.sendFile(path.join(__dirname,'webPage', 'index.html'));
});
app.get('/about', (req, res) => {
 // res.send('This is the about page of the Node.js server. My name is ChatGPT');
 res.sendFile(path.join(__dirname,'webPage', 'about.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});