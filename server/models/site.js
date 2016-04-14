var db = require('../dbConfig');

var Site = db.Model.extend({
  tableName: 'Sites',
  userSites: function() {
    return this.hasMany('UserSite');
  }
});

module.exports = db.model('Site', Site);
