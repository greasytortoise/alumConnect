var userRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');

userRouter.route('/')
  .get(util.isLoggedIn, userController.fetchUsers)
  .post(util.isAdmin, userController.createUser);

userRouter.route('/group/:id')
  .get(util.isLoggedIn, userController.fetchUsersByGroup);

userRouter.route('/user/:id')
  .get(util.isLoggedIn, userController.fetchUserInfo)
  .post(util.isLoggedIn, userController.modifyUser)
  .delete(util.isAdmin, userController.deleteUser);

module.exports = userRouter;