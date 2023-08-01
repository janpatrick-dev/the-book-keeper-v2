const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 32,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    minLength: 6,
    unique: true,
    validate: [validator.isEmail, 'Invalid email format!']
  },
  name: {
    type: String
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 255
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.email;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;