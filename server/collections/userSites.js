var db = require('../dbConfig');
var UserSite = require('../models/userSite');

var UserSites = new db.Collection();
UserSites.model = UserSite;

module.exports = UserSites;