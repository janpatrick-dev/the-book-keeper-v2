const Book = require("../models/Book");
const User = require("../models/User");

const getAll = async (request, response) => {
  const books = await Book.find({}).populate('user', { email: 1, name: 1 });
  response.status(200).json(books);
}

const getUserBooks = async (request, response) => {
  const user = request.user;
  console.log(user);
  const books = await Book
    .find({ user: user.id })
    .populate('user', { email: 1, name: 1 });
  response.status(200).json(books);
};

const getUserBook = async (request, response) => {
  const id = request.params.id;
  const user = request.user;
  const books = await Book
    .find({ user: user.id })
    .populate('user', { email: 1, name: 1 });
  const book = books.find((b) => b.id === id);
  response.status(200).json(book);
}

const create = async (request, response) => {
  const user = request.user;
  const body = request.body;
  const newBook = await Book.create({ 
    ...body,
    user: user.id 
  });

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
  const bookToDelete = await Book.findByIdAndRemove(id);
  const user = await User.findById(bookToDelete.user.toString());
  user.books = user.books.filter((book) => (
    bookToDelete._id.toString() !== book.toString()
  ));
  await user.save();

  response.status(204).end();
};

module.exports = { getAll, getUserBooks, getUserBook, create, update, remove };