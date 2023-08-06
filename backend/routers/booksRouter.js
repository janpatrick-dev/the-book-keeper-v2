const booksRouter = require('express').Router();
const controller = require('../controllers/booksController');
const middleware = require('../utils/middleware');

if (process.env.NODE_ENV === 'test') {
  booksRouter.get('/all', controller.getAll);
}

booksRouter.get('/', middleware.userExtractor, controller.getUserBooks);

booksRouter.get('/:id', middleware.userExtractor, controller.getUserBook);

booksRouter.post('/', middleware.userExtractor, controller.create);

booksRouter.put('/:id', middleware.userExtractor, controller.update);

booksRouter.delete('/:id', middleware.userExtractor, controller.remove);

module.exports = booksRouter;