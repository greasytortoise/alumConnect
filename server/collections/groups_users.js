var db = require('../dbConfig');
var Group_user = require('../models/group_user');

var Groups_Users = new db.Collection();
Groups_Users.model = Group_user;

module.exports = Groups_Users;
