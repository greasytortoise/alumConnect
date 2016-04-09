var db = require('../dbConfig');
var User = require('./user');

var Bio = db.Model.extend({
  tableName: 'Bios',
  users: function() {
    console.log('what is going on?!?!?');
    return this.belongsTo(Bio);
  }
});

module.exports = Bio;
