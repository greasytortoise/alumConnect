var db = require('../dbConfig');
var User = require('./user');

var Bio = db.Model.extend({
  tableName: 'Bios',
  bios: function() {
    return this.hasOne(User);
  }
});

module.exports = Bio;