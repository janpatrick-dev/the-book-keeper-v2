const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const config = require('../utils/config');
const User = require('../models/User');

loginRouter.get('/', async (request, response) => {
  
});

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });

    const passwordCorrect = user
      ? await bcrypt.compare(password, user.password)
      : null;

    if (!user || !passwordCorrect) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    const userForToken = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    const token = jwt.sign(
      userForToken, 
      config.TOKEN_SECRET,
      { expiresIn: config.TOKEN_DURATION }  
    );

    response.status(200).json({ token: token, email: user.email, name: user.name });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = loginRouter;