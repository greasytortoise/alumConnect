var db = require('../dbConfig');

var BioField = db.Model.extend({
  tableName: 'Bio_Fields',
  bios: function() {
    return this.hasOne('Bio');
  }
});

module.exports = db.model('BioField', BioField);
