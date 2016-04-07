var db = require('../dbConfig');
var User = require('./user');

var Network = db.Model.extend({
  tableName: 'Networks',
  hasTimestamps: true,
  user: function() {
    return this.hasOne(User);
  }
});

module.exports = Network;