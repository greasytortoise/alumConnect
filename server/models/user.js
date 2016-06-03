var db = require('../dbConfig');

var User = db.Model.extend({
  tableName: 'Users',
  groups: function() {
    // return this.belongsTo('Group'); // changed!!
    return this.belongsToMany('Group');
  },
  userSites: function() {
    return this.hasMany('UserSite');
  },
  bios: function() {
    return this.hasMany('Bio');
  }
});

module.exports = db.model('User', User);
