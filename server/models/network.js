var db = require('../dbConfig');
var NetworkValue = require('./networkValue');

var Network = db.Model.extend({
  tableName: 'Networks',
  networkValues: function() {
    return this.hasMany(networkValue);
  }
});

module.exports = Network;
