const config = require('./utils/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const UserRoute = require('./routes/UserRoute');
const LoginRoute = require('./routes/LoginRoute');
const BookRoute = require('./routes/BookRoute');

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

app.use(cors());
app.use(express.json());
app.use('/api/users', UserRoute);
app.use('/api/login', LoginRoute);
app.use('/api/books', BookRoute);

app.listen(config.PORT, () => {
  console.log('listening on port', config.PORT);
});