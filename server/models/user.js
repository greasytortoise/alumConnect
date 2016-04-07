var db = require('../dbConfig');
var Group = require('./group');
var Network = require('./network');
var Bio = require('./bio');

var User = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: true,
  group: function() {
    return this.belongsTo(Group);
  },
  network: function() {
    return this.belongsTo(Network);
  },
  bio: function() {
    return this.hasOne(Bio);
  }
});

module.exports = User;