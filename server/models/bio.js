var db = require('../dbConfig');
var User = require('./user');

var Bio = db.Model.extend({
  tableName: 'Bios',
  bio: function() {
    return this.hasOne(User);
  }
});

module.exports = Bio;