var userRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');

userRouter.route('/')
  .get(userController.fetchUsers)
  .post(util.isAdmin, userController.createUser);

userRouter.route('/group/:id')
  .get(userController.fetchUsersByGroup);

userRouter.route('/user/:id')
  .get(userController.fetchUserInfo)
  .post(util.isAdmin, userController.modifyUser)
  .delete(util.isAdmin, userController.deleteUser);

module.exports = userRouter;