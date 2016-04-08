var db = require('../dbConfig');
var User = require('./user');

var Group = db.Model.extend({
  tableName: 'Groups',
  user: function() {
    return this.hasMany(User);
  }
});

module.exports = Group;