var db = require('../dbConfig');
var VisibleGroup = require('../models/visibleGroup');

var VisibleGroups = new db.Collection();
VisibleGroups.model = VisibleGroup;

module.exports = VisibleGroups;
