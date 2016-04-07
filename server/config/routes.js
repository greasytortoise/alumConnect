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
    Groups.create({
      group_name: 'HR40'
    })
    .then(function() {
      Users.create({
        username: 'yochess',
        password: 'lol',
        email: 'drake@aol.com',
        url_hash: 'a1b2c3',
        public: 1,
        permission: 1
      });
    })
    .then(function() {
      Networks.create({
        network_name: 'facebook',
        username: 'snorky'
      });
    })
    .then(function() {
      Bios.create({
        lorem: 'a',
        ipsum: 'b',
        dolor: 'c',
        sit: 'd'
      });
    })
    .then(function() {
      res.send(201);
    });

  });

};