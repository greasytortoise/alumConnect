var db = require('../dbConfig');

var UserSite = db.Model.extend({
  tableName: 'User_Sites',
  users: function() {
    return this.belongsTo('User');
  },
  sites: function() {
    return this.belongsTo('Site');
  }
});

module.exports = db.model('UserSite', UserSite);;
