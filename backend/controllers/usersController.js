const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const getAll = async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
};

const create = async (request, response) => {
  const body = request.body;
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  const newUser = await User.create({ ...body, password: hashedPassword });

  const userForToken = {
    id: newUser._id,
    username: newUser.username,
    name: newUser.name
  };

  const token = jwt.sign(
    userForToken, 
    process.env.PROD_TOKEN_SECRET,
    { expiresIn: 20 }  
  );

  response.status(201).json({ token: token, username: newUser.name, name: newUser.name });
};

const remove = async (request, response) => {
  const id = request.params.id;
  await User.findByIdAndRemove(id);
  response.status(204).end();
}

module.exports = { getAll, create, remove };