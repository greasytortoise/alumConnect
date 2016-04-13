var db = require('../dbConfig');

var Bio = db.Model.extend({
  tableName: 'Bios',
  users: function() {
    return this.belongsTo('User');
  },
  bioFields: function() {
    return this.belongsTo('BioField');
  }
});

module.exports = db.model('Bio', Bio);
