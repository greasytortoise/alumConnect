var siteRouter = require('express').Router();
var siteController = require('../controllers/siteController');
var util = require('../lib/utility.js');

siteRouter.route('/')
  .get(siteController.fetchSites)
  .post(util.isAdmin, siteController.createSite);

siteRouter.route('/site/:id')
  .post(util.isAdmin, siteController.modifySite)
  .delete(util.isAdmin, siteController.deleteSite);

module.exports = siteRouter;
