const usersRouter = require('express').Router();
const controller = require('../controllers/usersController');

if (process.env.NODE_ENV === 'test') {
  usersRouter.get('/', controller.getAll);
}

usersRouter.post('/', controller.create);

module.exports = usersRouter;