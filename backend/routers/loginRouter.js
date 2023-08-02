const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    const passwordCorrect = user
      ? await bcrypt.compare(password, user.password)
      : null;

    if (!user || !passwordCorrect) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    const userForToken = {
      id: user._id,
      username: user.username,
      name: user.name
    };

    const token = jwt.sign(
      userForToken, 
      process.env.PROD_TOKEN_SECRET,
      { expiresIn: 60 }  
    );

    response.status(200).json({ token: token, username: user.name, name: user.name });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = loginRouter;