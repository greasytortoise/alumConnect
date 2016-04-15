var siteRouter = require('express').Router();
var siteController = require('../controllers/siteController');

siteRouter.route('/')
  .get(siteController.fetchSites)
  .post(siteController.createSite);

siteRouter.route('/site/:id')
  .post(siteController.modifySite)
  .delete(siteController.deleteSite);

module.exports = siteRouter;
