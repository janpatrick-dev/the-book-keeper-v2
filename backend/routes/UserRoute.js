const userRouter = require('express').Router();
const userController = require('../controllers/UserController');

if (process.env.NODE_ENV === 'test') {
  userRouter.get('/', userController.getAll);
}

userRouter.post('/', userController.create);

module.exports = userRouter;