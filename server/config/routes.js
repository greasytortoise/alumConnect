var path = require('path')
var db = require('../dbConfig');
var Groups = require('../collections/groups');
var Group = require('../models/group');
var Networks = require('../collections/networks');
var Network = require('../models/network');
var Users = require('../collections/users');
var User = require('../models/user');
var Bios = require('../collections/bios');
var Bio = require('../models/bio');
var util = require('../lib/utility.js');
var bcrypt = require('bcrypt');


module.exports = function(app, express) {
  app.get('/db/groups', function(req, res) {
    Groups.fetch()
      .then(function(groups) {
        res.json(groups);
      });
  });

  app.get('/db/groups/:id', function(req, res) {
    var id = req.params.id;
    Group.where({id: id}).fetch()
      .then(function(group) {
        res.json(group);
      });
  });

  app.post('/db/groups', function(req, res) {
    //todo
  });

  app.get('/db/users', function(req, res) {
    Users.fetch().then(function(users) {
      res.json(users);
    });
  });

  app.get('/db/users/:id', function(req, res) {
    var id = req.params.id;
    User.where({id: id}).fetch()
      .then(function(user) {
        res.json(user);
      });
  });

  app.post('/db/users', function(req, res) {
    //todo
  });

  app.get('/db/networks', function(req, res) {
    Networks.fetch().then(function(networks) {
      res.json(networks);
    });
  });

  app.post('/db/networks', function(req, res) {
    //todo
  });

  app.get('/db/networks/:id', function(req, res) {
    var id = req.params.id;
    Network.where({id: id}).fetch()
      .then(function(network) {
        res.json(network);
      });
  });

  app.get('/db/bios', function(req, res) {
    Bios.fetch().then(function(bios) {
      res.json(bios);
    });
  });

  app.get('/db/bios/:id', function(req, res) {
    var id = req.params.id;
    Bio.where({id: id}).fetch()
      .then(function(bio) {
        res.json(bio);
      });
  });

  app.post('/db/bios', function(req, res) {
    Bio.create({
      name: 'robot',
      before_hr: 'sleep all day',
      location: 'planet earth',
      interest: 'sleep',
      experience: 'sleep a lot',
      fun_fact: 'I like to sleep',
      user_id: 5
    })
    .then(function(bio) {
      res.send(201);
    });
  });

  // this is currently not working (for test purposes)
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

  app.post('/login', function(req, res) {
    util.comparePass(req.body.password, function(match, user) {
      if(match) {
        res.send(200, util.generateToken(user.id, user));
      } else {
        res.send(401, 'Invalid Password');
      }
    })
  });

  app.post('/changepassword', function(req, res) {
    var tokenUserData = req.token.split('.')[1].user;
    Users.where({id: tokenUserData.id}).fetch().then(function(user){
      bcrypt.hash(password, 10, function(err, hash) {
        
        //DO THING WITH HASH
        //SAVE NEW PW TO DB!

      });
    });
  });

  app.get('*', function (request, response){
    console.log('directing to index');
    response.sendFile(path.resolve(__dirname,  '../../client/index.html'))
  });
};










