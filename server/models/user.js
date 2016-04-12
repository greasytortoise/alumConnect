var db = require('../dbConfig');
var Group = require('./group');
var NetworkValue = require('./networkValue');
var Bio = require('./bio');

var User = db.Model.extend({
  tableName: 'Users',
  groups: function() {
    // working
    return this.belongsTo(Group);
  },
  networkValues: function() {
    // working
    return this.hasOne(NetworkValue);
  },
  bios: function() {
    // working
    return this.hasOne(Bio);
  }
});

module.exports = User;
