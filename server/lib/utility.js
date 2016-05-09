var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var moment = require('moment');
var User = require('../models/user');
var config = require('../config/githubAPIConfig.js');

exports.isLoggedIn = function(req, res, next) {

  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.isAdmin = function(req, res, next) {

  if (req.isAuthenticated()) {
    User.where({githubid: req.user.userData.githubid}).fetch()
      .then(function(user) {
        if(user.permission === 1) {
          next();
        } else {
          res.redirect('/');
        }
      });
  } else {
    res.redirect('/login');
  }
};

