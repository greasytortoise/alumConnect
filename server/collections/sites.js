var db = require('../dbConfig');
var Site = require('../models/site');

var Sites = new db.Collection();
Sites.model = Site;

module.exports = Sites;