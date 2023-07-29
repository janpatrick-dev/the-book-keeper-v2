const bookRouter = require('express').Router();
const bookController = require('../controllers/BookController');

bookRouter.get('/', bookController.getAll);

bookRouter.post('/', bookController.create);

bookRouter.put('/:id', bookController.update);

bookRouter.delete('/:id', bookController.remove);

module.exports = bookRouter;