var db = require('../dbConfig');
var User = require('./user');
var Network = require('./network');

var NetworkValue = db.Model.extend({
  tableName: 'Network_Values',
  users: function() {
    return this.belongsTo(User);
  },
  networks: function() {
    return this.belongsTo(Network);
  }
});

module.exports = NetworkValue;
