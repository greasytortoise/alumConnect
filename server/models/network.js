var db = require('../dbConfig');
var User = require('./user');

var Network = db.Model.extend({
  tableName: 'Networks',
  users: function() {
    return this.belongsTo(User);
  }
});

module.exports = Network;
