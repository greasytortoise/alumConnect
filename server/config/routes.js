var db = require('../dbConfig');
var Groups = require('../collections/groups');
var Networks = require('../collections/networks');
var Users = require('../collections/users');
var Bios = require('../collections/bios');


module.exports = function(app, express) {
  app.get('/test', function(req, res) {
    res.send(200);
  });

  app.get('/testDatabase', function(req, res) {
    db.knex('users').then(function(res) {
      console.log(res);
    });
  });
};