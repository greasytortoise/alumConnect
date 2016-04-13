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
  // db/groups
  app.get('/db/groups', handler.fetchGroups);
  app.get('/db/groups/group/:id', handler.fetchGroupId);
  app.post('/db/groups', handler.createGroup);
  app.post('/db/groups/group/:id', handler.modifyGroup);
  app.delete('/db/groups/group/:id', handler.deleteGroup);

  // db/users
  app.get('/db/users', handler.fetchUsers);
  app.get('/db/users/group/:id', handler.fetchUsersByGroup);
  app.get('/db/users/user/:id', handler.fetchUserId);
  app.post('/db/users', handler.createUser);
  app.post('/db/users/user/:id', handler.modifyUser);
  app.delete('/db/users/user/:id', handler.deleteUser);

  // db/sites (previously networks)
  app.get('/db/sites', handler.fetchSites);
  app.get('/db/sites/site/:id', handler.fetchSiteId);
  app.post('/db/sites', handler.createSite);
  app.post('/db/sites/site/:id', handler.modifySite);
  app.delete('/db/sites/site/:id', handler.deleteSite);

  // db/fields
  app.get('/db/fields', handler.fetchFields);
  app.get('/db/fields/field/:id', handler.fetchFieldId);
  app.post('/db/fields', handler.createField);
  app.post('/db/fields/field/:id', handler.modifyField);
  app.delete('/db/fields/field/:id', handler.deleteField);

  // app.get('/db/groups', handler.fetchGroups);
  // app.get('/db/groups/:id', handler.fetchGroupId);
  // app.post('/db/groups', handler.postGroup);

  // app.get('/db/users', handler.fetchUsers);
  // app.get('/db/users/:id', handler.fetchUserId);
  // app.post('/db/users', handler.postUser);

  // app.get('/db/networks', handler.fetchNetworks);
  // app.get('/db/networks/:id', handler.fetchNetworkId);
  // app.post('/db/networks', handler.postNetwork);

  // app.get('/db/bios', handler.fetchBios);
  // app.get('/db/bios/:id', handler.fetchBioId);
  // app.post('/db/bios', handler.postBio);

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





