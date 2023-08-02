const Book = require("../models/Book");
const User = require("../models/User");

const getAll = async (request, response) => {
  const books = await Book.find({});
  response.status(200).json(books);
}

const getUserBooks = async (request, response) => {
  const user = request.user;
  const books = await Book
    .find({ user: user.id })
    .populate('user', { username: 1, name: 1 });
  response.status(200).json(books);
};

const create = async (request, response) => {
  const user = request.user;
  const body = request.body;
  const newBook = await Book.create({ ...body, user: user.id });

  const author = await User.findById(user.id);
  author.books = [...author.books, newBook];
  await author.save();

  response.status(201).json(newBook);
};

const update = async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const user = request.user;
  const updatedBook = await Book.findByIdAndUpdate(
    id, 
    { ...body, user: user.id }, 
    { new: true, runValidators: true, context: 'query' 
  });
  response.status(200).json(updatedBook);
};

const remove = async (request, response) => {
  const id = request.params.id;
  await Book.findByIdAndRemove(id);
  response.status(204).end();
};

module.exports = { getAll, getUserBooks, create, update, remove };