var db = require('../dbConfig');

var Group_User = db.Model.extend({
  tableName: 'Groups_Users',
  groups: function() {
    return this.belongsTo('Group');
  },
  users: function() {
    return this.belongsTo('User');
  }
});

module.exports = db.model('Groups_Users', Group_User);
