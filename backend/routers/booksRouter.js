const booksRouter = require('express').Router();
const controller = require('../controllers/booksController');
const middleware = require('../utils/middleware');


booksRouter.get('/', middleware.userExtractor, controller.getAll);

booksRouter.post('/', middleware.userExtractor, controller.create);

booksRouter.put('/:id', middleware.userExtractor, controller.update);

booksRouter.delete('/:id', middleware.userExtractor, controller.remove);

module.exports = booksRouter;