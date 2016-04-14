var db = require('../dbConfig');

var NetworkValue = db.Model.extend({
  tableName: 'User_Sites',
  users: function() {
    return this.belongsTo('User');
  },
  networks: function() {
    return this.belongsTo('Network');
  }
});

module.exports = db.model('NetworkValue', NetworkValue);;
