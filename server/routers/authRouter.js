var authRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var User = require('../models/user');

authRouter.route('/')
  .get(passport.authenticate('github', {scopes: [ 'user:email' ]}));

authRouter.route('/logout')
  .get(function(req, res) {
    console.log('LOGGING OUT ');
    req.logout();
    req.session.destroy();
    res.redirect('/login');
  });


authRouter.route('/error')
  .get(function(req, res) {
    res.redirect('/login');
  });

authRouter.route('/callback')
    .get(passport.authenticate('github', { failureRedirect: '/auth/error'}),
    function(req, res) {
      // In the real application you might need to check 
      // whether the user exists and if exists redirect 
      // or if not you many need to create user.
      console.log(req.user.userData.handle)
      // console.log(req.session)
      // User.where({githubid: userObj.userData.id }).fetch()
      //   .then(function(user) {
      //     if (!user) {
      //       done(null, null);
      //     } else {
      //       done(null, user);
      //     }
      res.redirect('/');
    });

authRouter.route('/getpermissions')
  .get(util.isLoggedIn, function(req, res) {
    User.where({githubid: req.user.userData.id}).fetch()
      .then(function(user) {
        if(err) {
          throw err;
        } else {
          res.status(200).send(user.permissions);
        }
      })
  })

module.exports = authRouter;
