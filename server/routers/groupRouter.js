var groupRouter = require('express').Router();
var groupController = require('../controllers/groupController');
var util = require('../lib/utility.js');

//filter in here
groupRouter.route('/')
  .get(util.isLoggedIn, groupController.fetchGroups)
  .post(util.isAdmin, groupController.createGroup);

//middleware in here
groupRouter.route('/group/:id')
  .get(util.isLoggedIn, groupController.fetchGroupInfo)
  .post(util.isAdmin, groupController.modifyGroup)
  .delete(util.isAdmin, groupController.deleteGroup);

module.exports = groupRouter;
