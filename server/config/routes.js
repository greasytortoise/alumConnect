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
    Group.where({id: 1}).fetch({withRelated: ['user']})
      .then(function(group) {
        res.send(JSON.stringify(group));
      });
  });

  app.get('/testDatabase', function(req, res) {
    return Groups.create({
      group_name: 'HR40'
    })
    .then(function(group) {
      console.log('<<group: ', group);
      return Users.create({
        username: 'yochess',
        password: 'lol',
        email: 'drake@aol.com',
        url_hash: 'a1b2c3',
        public: 1,
        permission: 1,
        group_id: group.get('id')
      });
    })
    .then(function(user) {
      console.log('<<user: ', user);
      Networks.create({
        network_name: 'facebook',
        username: 'snorky',
        user_id: user.get('id')
      });
      return user;
    })
    .then(function(user) {
      console.log('<<user: ', user);
      return Bios.create({
        lorem: 'a',
        ipsum: 'b',
        dolor: 'c',
        sit: 'd',
        user_id: user.get('id')
      });
    })
    .then(function() {
      res.send(201);
    });

  });

};