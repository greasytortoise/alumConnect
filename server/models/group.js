var db = require('../dbConfig');
var User = require('./user');

var Group = db.Model.extend({
  tableName: 'Groups',
  hasTimestamps: true,
  user: function() {
    return this.hasMany(User);
  }
});

module.exports = Group;