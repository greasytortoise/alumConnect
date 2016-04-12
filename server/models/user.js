var db = require('../dbConfig');
var Group = require('./group');
var NetworkValue = require('./networkValue');
var Bio = require('./bio');

var User = db.Model.extend({
  tableName: 'Users',
  groups: function() {
    return this.belongsTo(Group);
  },
  networkValues: function() {
    return this.hasOne(NetworkValue);
  },
  bios: function() {
    return this.hasOne(Bio);
  }
});

module.exports = User;
