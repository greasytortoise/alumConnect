var db = require('../dbConfig');
var User = require('./user');

var Bio = db.Model.extend({
  tableName: 'Bios',
  hasTimestamps: true,
  bio: function() {
    return this.hasOne(User);
  }
});

module.export = Bio;