var db = require('../dbConfig');

var Group = db.Model.extend({
  tableName: 'Groups',
  users: function() {
    return this.belongsToMany('User');
  },
  visibleGroups: function() {
    return this.hasMany('VisibleGroup');
  }
});

module.exports = db.model('Group', Group);
