var path = require('path')
var db = require('../dbConfig');
var util = require('../lib/utility.js');
var bcrypt = require('bcrypt');
var handler = require('../lib/handler');

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

var groupRouter = require('../routers/groupRouter');
var userRouter = require('../routers/userRouter');
var siteRouter = require('../routers/siteRouter');
var fieldRouter = require('../routers/fieldRouter');
var userSiteRouter = require('../routers/userSiteRouter');
var bioRouter = require('../routers/bioRouter');
var authRouter = require('../routers/authRouter');

module.exports = function(app, express) {
  app.use('/db/groups', groupRouter);
  app.use('/db/users', userRouter);
  app.use('/db/sites', siteRouter);
  app.use('/db/fields', fieldRouter);
  app.use('/dashboard/db/users', userRouter);
  app.use('/auth', authRouter);

  app.post('/checktoken', util.getPermissions);
  app.post('/login', handler.checkLogin);

  app.post('/user/uploadimage', function(req, res) {
    // res.status(204).end();
  })
  // app.get('/auth', passport.authenticate('github'));
  // app.get('/auth/error', auth.error);
  // app.get('/auth/callback',
  //   passport.authenticate('github', {failureRedirect: '/auth/error'}),
  //   auth.callback
  // );

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
