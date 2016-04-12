var db = require('../dbConfig');
var NetworkValue = require('./networkValue');

var Network = db.Model.extend({
  tableName: 'Networks',
  networkValues: function() {
    // NOT WORKING
    return this.hasMany(NetworkValue);
  }
});

module.exports = Network;
