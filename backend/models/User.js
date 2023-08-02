const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minLength: [6, 'Email must have 6 characters or more.'],
    unique: [true, 'Email already exists.'],
    required: [true, 'Email is required.'],
    validate: [validator.isEmail, 'Invalid email format.']
  },
  name: {
    type: String
  },
  password: {
    type: String,
    minLength: [6, 'Password must have 6 characters or more.'],
    maxLength: 255,
    required: [true, 'Password is required.']
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
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;