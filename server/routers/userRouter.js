var userRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');

// adding 2 to the end of each modified methods

userRouter.route('/')
  .get(util.isLoggedIn, userController.fetchUsers3)
  .post(util.isAdmin, userController.createUser2);

// userRouter.route('/group/:id')
//   .get(util.isLoggedIn, userController.fetchUsersByGroup4);

userRouter.route('/user/:id')
  .get(util.isLoggedIn, userController.fetchUserInfo3)
  .post(util.isLoggedIn, userController.modifyUser2)
  .delete(util.isAdmin, userController.deleteUser2);


userRouter.route('/user/visibility')
  .post(util.isAdmin, userController.toggleVisible);

userRouter.route('/name')
  .get((req, res) => {
    res.send({ name: req.user.name, id: req.user.id });
  });

module.exports = userRouter;
