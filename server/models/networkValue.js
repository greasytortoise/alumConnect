var db = require('../dbConfig');

var NetworkValue = db.Model.extend({
  tableName: 'Network_Values',
  users: function() {
    return this.belongsTo('User');
  },
  networks: function() {
    return this.belongsTo('Network');
  }
});

module.exports = db.model('NetworkValue', NetworkValue);;
