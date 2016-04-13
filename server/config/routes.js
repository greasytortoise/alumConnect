/** I am avoiding the usage of 'withRelated' since 
 *  bookshelf is not behaving the way I anticipate.
 *  If you guys decide to try and take advantage of
 *  this feature of bookshelf, GOOD LUCK!!!! 
**/


var path = require('path')
var db = require('../dbConfig');
var util = require('../lib/utility.js');
var bcrypt = require('bcrypt');
var handler = require('../lib/handler');
var Users = require('../collections/users');


module.exports = function(app, express) {

  app.get('/db/groups', handler.fetchGroups);
  app.get('/db/groups/:id', handler.fetchGroupId);
  app.post('/db/groups', handler.postGroup);

  app.get('/db/groups', function(req, res) {
    Groups.fetch()
      .then(function(groups) {
        res.json(groups);
    });
  });

  app.get('/db/users', handler.fetchUsers);
  app.get('/db/users/:id', handler.fetchUserId);
  app.post('/db/users', handler.postUser);

  app.get('/db/networks', handler.fetchNetworks);
  app.get('/db/networks/:id', handler.fetchNetworkId);
  app.post('/db/networks', handler.postNetwork);

  app.get('/db/bios', handler.fetchBios);
  app.get('/db/bios/:id', handler.fetchBioId);
  app.post('/db/bios', handler.postBio);

  app.post('/checktoken', util.getPermissions);


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

  app.post('/login', handler.checkLogin);

  app.post('/changepassword', function(req, res) {
    var tokenUserData = req.token.split('.')[1].user;
    Users.where({id: tokenUserData.id}).fetch().then(function(user){
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        
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





