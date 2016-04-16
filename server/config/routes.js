var path = require('path')
var db = require('../dbConfig');
var util = require('../lib/utility.js');
var bcrypt = require('bcrypt');
var handler = require('../lib/handler');

var groupRouter = require('../routers/groupRouter');
var userRouter = require('../routers/userRouter');
var siteRouter = require('../routers/siteRouter');
var fieldRouter = require('../routers/fieldRouter');
var userSiteRouter = require('../routers/userSiteRouter');
var bioRouter = require('../routers/bioRouter');

module.exports = function(app, express) {
  app.use('/db/groups', groupRouter);
  app.use('/db/users', userRouter);
  app.use('/db/sites', siteRouter);
  app.use('/db/fields', fieldRouter);
  app.use('/dashboard/db/users', userRouter);

  app.post('/checktoken', util.getPermissions);
  app.post('/login', handler.checkLogin);

  app.post('/test', util.isLoggedIn, function(req, res) {
    res.send(200);
  });
  app.post('/admintest', util.isAdmin, function(req, res) {
    res.send(200);
  });

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
