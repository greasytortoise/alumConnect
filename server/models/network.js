var db = require('../dbConfig');
var NetworkValue = require('./networkValue');

var Network = db.Model.extend({
  tableName: 'Networks',
  users: function() {
    return this.hasMany(networkValue);
  }
});

module.exports = Network;
