const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>');
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});