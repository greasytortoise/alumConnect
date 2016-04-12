var db = require('../dbConfig');
var User = require('./user');

var Bio = db.Model.extend({
  tableName: 'Bios',
  users: function() {
    // NOT WORKING
    return this.belongsTo(User);
  }
});

module.exports = Bio;
