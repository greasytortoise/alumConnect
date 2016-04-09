var db = require('../dbConfig');
var Group = require('./group');
var Network = require('./network');
var Bio = require('./bio');

var User = db.Model.extend({
  tableName: 'Users',
  groups: function() {
    return this.belongsTo(Group);
  },
  networks: function() {
    return this.hasMany(Network);
  },
  bios: function() {
    return this.hasOne(Bio);
  }
});

module.exports = User;
