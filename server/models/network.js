var db = require('../dbConfig');

var Network = db.Model.extend({
  tableName: 'Sites',
  networkValues: function() {
    return this.hasMany('NetworkValue');
  }
});

module.exports = db.model('Network', Network);
