var db = require('../dbConfig');

var VisibleGroup = db.Model.extend({
  tableName: 'Visible_Groups',
  groups: function() {
    return this.belongsTo('Group');
  }
});

module.exports = db.model('VisibleGroup', VisibleGroup);
