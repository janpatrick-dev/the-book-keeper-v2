const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const User = require('../models/User');

const getAll = async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
};

const create = async (request, response, next) => {
  try {
    const body = request.body;
    const newUser = await User.create(body);

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

    newUser.password = hashedPassword;

    await newUser.save();
    
    const userForToken = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name
    };
  
    const token = jwt.sign(
      userForToken, 
      config.TOKEN_SECRET,
      { expiresIn: config.TOKEN_DURATION }  
    );
  
    response.status(201).json({ token: token, email: newUser.email, name: newUser.name });
  } catch (err) {
    next(err);
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  await User.findByIdAndRemove(id);
  response.status(204).end();
}

module.exports = { getAll, create, remove };