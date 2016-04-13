var db = require('../dbConfig');

var Group = db.Model.extend({
  tableName: 'Groups',
  users: function() {
    return this.hasMany('User');
  }
});

module.exports = db.model('Group', Group);