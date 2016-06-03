var groupRouter = require('express').Router();
var groupController = require('../controllers/groupController');
var util = require('../lib/utility.js');

groupRouter.route('/')
  .get(util.isLoggedIn, groupController.fetchGroups2)
  .post(util.isAdmin, groupController.createGroup);

groupRouter.route('/group/:id')
  .get(util.isLoggedIn, groupController.fetchGroupInfo2)
  .post(util.isAdmin, groupController.modifyGroup)
  .delete(util.isAdmin, groupController.deleteGroup);

module.exports = groupRouter;
