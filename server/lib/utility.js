var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var moment = require('moment');
var User = require('../models/user');
var jwtTokenSecret = 'DONALD_TRUMP_HUGE_HANDS_NO_PROBLEM';


exports.generateToken = function(userid, email, perm, name) {
  //generates a JSON Web Token(JWT) to be sent with response on successful login attempt
  var expires = moment().add('days', 3).valueOf();
  var token = jwt.encode({
    iss: userid,
    exp: expires,
    perm: perm

  }, jwtTokenSecret);

  return {token: token, expires: expires, user: email, name: name };

};

exports.getSecret = function() {
  return jwtTokenSecret;
};

exports.isLoggedIn = function(req, res, next) {
  //Check token on request to make sure it's valid. 
  var token = (req.body && req.body.token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, jwtTokenSecret);

      if (decoded.exp <= Date.now()) {
        res.send(400, 'Access token has expired');
      } else {
        next();
      }


    } catch (err) {
      res.send(500, 'Error has occured');
    }
  } else {
    res.send(403, 'Not logged in');
  }
};

exports.getPermissions = function(req, res) {
  //Query the database for the owner of the token, and returns their permissions(0 for user, 1 for admin);
  var decoded = jwt.decode(req.body.token, jwtTokenSecret);
  User.where({id: decoded.iss}).fetch().then(function(user){
    res.send(200, user.attributes.permission);
  });

};


exports.isAdmin = function(req, res, next) {
  // if(req.body.token === undefined) {
  //   res.send(403, 'You have requested an admin-only resource without adequete permissions');
  // }
  // console.log(req.body.token);
  // var token = JSON.parse(req.body.token).token;
  // var decoded = jwt.decode(token, jwtTokenSecret);
  // User.where({id: decoded.iss}).fetch().then(function(user){
  //   if(user.attributes.permission === 1) {
  //     next();
  //   } else {
  //     res.send(403, 'You have requested an admin-only resource without adequete permissions');
  //   }
  // });

  //Middleware that checks for admin permissions before being allowed to continue. 

  var token = (req.body && req.body.token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, jwtTokenSecret);
      User.where({id: decoded.iss}).fetch().then(function(user){
        if(user.attributes.permission === 1) {
          next();
        } else {
          res.send(403, 'You have requested an admin-only resource without adequete permissions');
        }
      });


    } catch (err) {
      res.send(500, 'Error has occured');
    }
  } else {
    res.send(403, 'Not logged in');
  }

};


exports.allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
};