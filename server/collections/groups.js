var db = require('../config');
var Group = require('../models/group');

var Groups = new db.Collection();
Groups.model = Group;

module.exports = Groups;