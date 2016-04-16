var fieldRouter = require('express').Router();
var fieldController = require('../controllers/fieldController');
var util = require('../lib/utility.js');

fieldRouter.route('/')
  .get(fieldController.fetchFields)
  .post(util.isAdmin, fieldController.createField);

fieldRouter.route('/field/:id')
  .post(fieldController.modifyField)
  .delete(fieldController.deleteField);

module.exports = fieldRouter;
