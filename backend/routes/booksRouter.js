const booksRouter = require('express').Router();
const controller = require('../controllers/booksController');


booksRouter.get('/', controller.getAll);

booksRouter.post('/', controller.create);

booksRouter.put('/:id', controller.update);

booksRouter.delete('/:id', controller.remove);

module.exports = booksRouter;