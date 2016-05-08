var db = require('../dbConfig');

var Group = db.Model.extend({
  tableName: 'Groups',
  users: function() {
    return this.belongsToMany('User');
  }
});

module.exports = db.model('Group', Group);