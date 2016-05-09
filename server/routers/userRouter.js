var userRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');

// adding 2 to the end of each modified methods

userRouter.route('/')
  .get(userController.fetchUsers2)
  .post(util.isAdmin, userController.createUser2);

userRouter.route('/group/:id')
  .get(userController.fetchUsersByGroup2);

userRouter.route('/user/:id')
  .get(userController.fetchUserInfo2)
  .post(util.isLoggedIn, userController.modifyUser2)
  .delete(util.isAdmin, userController.deleteUser2);

userRouter.route('/group/:id')
  .get(util.isLoggedIn, userController.fetchUsersByGroup);

userRouter.route('/user/:id')
  .get(util.isLoggedIn, userController.fetchUserInfo)
  .post(util.isLoggedIn, userController.modifyUser)
  .delete(util.isAdmin, userController.deleteUser);

module.exports = userRouter;