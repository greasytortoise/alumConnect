var db = require('../dbConfig');

var User = db.Model.extend({
  tableName: 'Users',
  groups: function() {
    return this.belongsTo('Group');
  },
  networkValues: function() {
    return this.hasMany('NetworkValue');
  },
  bios: function() {
    return this.hasOne('Bio');
  }
});

module.exports = db.model('User', User);
