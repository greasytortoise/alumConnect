var groupRouter = require('express').Router();
var groupController = require('../controllers/groupController');

groupRouter.route('/')
  .get(groupController.fetchGroups)
  .post(groupController.createGroup);

groupRouter.route('/group/:id')
  .get(groupController.fetchGroupInfo)
  .post(groupController.modifyGroup)
  .delete(groupController.deleteGroup);

module.exports = groupRouter;
