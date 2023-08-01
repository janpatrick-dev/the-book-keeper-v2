const config = require('./utils/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const middleware = require('./utils/middleware');

const usersRouter = require('./routers/usersRouter');
const loginRouter = require('./routers/loginRouter');
const booksRouter = require('./routers/booksRouter');

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/books', booksRouter);

app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log('listening on port', config.PORT);
});