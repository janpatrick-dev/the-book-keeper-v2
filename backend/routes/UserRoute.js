const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/User');

if (process.env.NODE_ENV === 'test') {
  userRouter.get('/', async (request, response) => {
    try {
      const users = await User.find({});
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  });
}

userRouter.post('/', async (request, response) => {
  try {
    const body = request.body;
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const newUser = await User.create({ ...body, password: hashedPassword });
    response.status(201).json(newUser);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;