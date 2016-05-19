var userRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');

// adding 2 to the end of each modified methods

userRouter.route('/')
  .get(util.isLoggedIn, userController.fetchUsers2)
  .post(util.isAdmin, userController.createUser2);

// userRouter.route('/group/:id')
//   .get(util.isLoggedIn, userController.fetchUsersByGroup4);

userRouter.route('/user/:id')
  .get(util.isLoggedIn, userController.fetchUserInfo2)
  .post(util.isLoggedIn, userController.modifyUser2)
  .delete(util.isAdmin, userController.deleteUser2);


userRouter.route('/user/visibility')
  .post(util.isAdmin, userController.toggleVisible);

userRouter.route('/name')
  .get(function(req, res) {
    console.log('REPENT!!!!')
    console.log(req.user);
    res.send(req.user.name);
  });

module.exports = userRouter;
