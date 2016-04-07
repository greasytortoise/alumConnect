var db = require('../dbConfig');
var Groups = require('../collections/groups');
var Group = require('../models/group');
var Networks = require('../collections/networks');
var Network = require('../models/network');
var Users = require('../collections/users');
var User = require('../models/user');
var Bios = require('../collections/bios');
var Bio = require('../models/bio');

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