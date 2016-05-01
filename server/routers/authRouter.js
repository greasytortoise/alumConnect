var authRouter = require('express').Router();
var userController = require('../controllers/userController');
var util = require('../lib/utility.js');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var config = require('./githubAPIConfig.js');

authRouter.route('/')
  .get(passport.authenticate('github'));

authRouter.route('/error')
  .get(function(req, res) {
    res.redirect('/login');
  });

authRouter.route('/callback', passport.authenticate('github', {failureRedirect: '/auth/error'}),
    config.githubCallbackUrl)

module.exports = authRouter;
