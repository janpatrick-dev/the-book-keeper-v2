const validator = require('validator');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (request, response) => {
  const { identifier, password } = request.body;
  let user;

  try {
    if (validator.isEmail(identifier)) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ username: identifier });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !passwordCorrect) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = loginRouter;