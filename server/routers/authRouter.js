var authRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;

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
      res.redirect('/');
    });

module.exports = authRouter;
