var fieldRouter = require('express').Router();
var fieldController = require('../controllers/fieldController');
var util = require('../lib/utility.js');

fieldRouter.route('/')
  .get(util.isLoggedIn, fieldController.fetchFields)
  .post(util.isAdmin, fieldController.createField);

fieldRouter.route('/field/:id')
  .post(util.isLoggedIn, fieldController.modifyField)
  .delete(util.isAdmin, fieldController.deleteField);

module.exports = fieldRouter;
