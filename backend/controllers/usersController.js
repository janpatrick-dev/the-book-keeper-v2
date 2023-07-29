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
  response.status(201).json(newUser);
};

module.exports = { getAll, create };