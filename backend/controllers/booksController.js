const Book = require("../models/Book");

const getAll = async (request, response) => {
  const books = await Book.find({});
  response.status(200).json(books);
};

const create = async (request, response) => {
  const body = request.body;
  const newBook = await Book.create(body);
  response.status(201).json(newBook);
};

const update = async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });
  response.status(200).json(updatedBook);
};

const remove = async (request, response) => {
  const id = request.params.id;
  await Book.findByIdAndRemove(id);
  response.status(204).end();
};

module.exports = { getAll, create, update, remove };