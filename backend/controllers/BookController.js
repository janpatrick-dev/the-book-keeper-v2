const Book = require("../models/Book");

const getAll = async (request, response) => {
  try {
    const books = await Book.find({});
    response.status(200).json(books);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const create = async (request, response) => {
  try {
    const body = request.body;
    const newBook = await Book.create(body);
    response.status(201).json(newBook);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const update = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });
    response.status(200).json(updatedBook);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const remove = async (request, response) => {
  try {
    const id = request.params.id;
    await Book.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create, update, remove };