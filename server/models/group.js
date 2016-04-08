var db = require('../dbConfig');
var User = require('./user');

var Group = db.Model.extend({
  tableName: 'Groups',
  users: function() {
    console.log(this);
    return this.hasMany(User);
  }
});

module.exports = Group;