var path = require('path')
var db = require('../dbConfig');
var util = require('../lib/utility.js');
var bcrypt = require('bcrypt');
var handler = require('../lib/handler');
var Users = require('../collections/users');


module.exports = function(app, express) {
  // db/groups
  app.get('/db/groups', handler.fetchGroups);
  app.get('/db/groups/group/:id', handler.fetchGroupInfo);
  app.post('/db/groups', handler.createGroup);
  app.post('/db/groups/group/:id', handler.modifyGroup);
  app.delete('/db/groups/group/:id', handler.deleteGroup);

  // db/users
  app.get('/db/users', handler.fetchUsers);
  app.get('/db/users/group/:id', handler.fetchUsersByGroup);
  app.get('/db/users/user/:id', handler.fetchUserInfo);
  app.post('/db/users', handler.createUser);
  app.post('/db/users/user/:id', handler.modifyUser);
  app.delete('/db/users/user/:id', handler.deleteUser);

  // db/sites (previously networks)
  app.get('/db/sites', handler.fetchSites);
  app.post('/db/sites', handler.createSite);
  app.post('/db/sites/site/:id', handler.modifySite);
  app.delete('/db/sites/site/:id', handler.deleteSite);

  // db/fields
  app.get('/db/fields', handler.fetchFields);
  app.post('/db/fields', handler.createField);
  app.post('/db/fields/field/:id', handler.modifyField);
  app.delete('/db/fields/field/:id', handler.deleteField);

  app.post('/checktoken', util.getPermissions);
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





