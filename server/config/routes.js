var db = require('../dbConfig');
var Groups = require('../collections/groups');
var Group = require('../collections/group');
var Networks = require('../collections/networks');
var Network = require('../model/network');
var Users = require('../collections/users');
var User = require('../collections/user');
var Bios = require('../collections/bios');
var Bio = require('../collections/bio');

module.exports = function(app, express) {
  app.get('/test', function(req, res) {
    res.send(200);
  });

  app.get('/testDatabase', function(req, res) {
    db.knex('users').then(function(res) {
      console.log(res);
    });
  });

  app.post('/testDatabase', function(req, res) {
    
  });
};