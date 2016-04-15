var userRouter = require('express').Router();
var userController = require('../controllers/userController');

userRouter.route('/')
  .get(userController.fetchUsers)
  .post(userController.createUser);

userRouter.route('/group/:id')
  .get(userController.fetchUsersByGroup);

userRouter.route('/user/:id')
  .get(userController.fetchUserInfo)
  .post(userController.modifyUser)
  .delete(userController.deleteUser);

module.exports = userRouter;