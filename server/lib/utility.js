var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var moment = require('moment');
var jwtTokenSecret = 'DONALD_TRUMP_HUGE_HANDS_NO_PROBLEM';


exports.generateToken = function(userid, user) {
  var expires = moment().add('days', 3).valueOf();
  var token = jwt.encode({
    iss: userid,
    exp: expires
  }, jwtTokenSecret);

  return {token: token, expires: expires, user: JSON.stringify(user)};

};

exports.getSecret = function() {
  return jwtTokenSecret;
}

exports.isLoggedIn = function(req) {
  //PROBABLY NEEDS ADJUSTMENT
  //CHECK TO ENSURE JWT SENT WITH REQUESTS
  console.log('isLoggedIn Called');
  // return req.token ? !!req.token.user : false;
  return true;
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