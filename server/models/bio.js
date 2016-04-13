var db = require('../dbConfig');

var Bio = db.Model.extend({
  tableName: 'Bios',
  users: function() {
    return this.belongsTo('User');
  }
});

module.exports = db.model('Bio', Bio);;
