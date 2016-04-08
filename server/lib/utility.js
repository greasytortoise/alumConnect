var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var Users = require('../collections/users');


exports.generateToken = function(userid, user) {
  var expires = moment().add('days', 3).valueOf();
  var token = jwt.encode({
    iss: userid,
    exp: expires
  }, app.get('jwtTokenSecret'));

  return {token: token, expires: expires, user: user.toJSON()}.toJSON();

};

exports.hashAndStore = function(password, callback) {
  bcrypt.hash(password, 10, function(err, hash) {
    
    //DO THING WITH HASH
    callback(hash);
  });
};


exports.comparePass = function(password, callback) {

  //GET HASHED PASSWORD FROM DB
  Users.where({email: req.body.email }).fetch().then(function(user){
    if(user.length === 0) {
      res.send(401, 'No user with that email');
    } else {
      bcrypt.compare(password, user[0].password, function(err, isMatch){
        callback(isMatch, user);
      });

    }
  })


};


exports.isLoggedIn = function(req) {
  //PROBABLY NEEDS ADJUSTMENT
  //CHECK TO ENSURE JWT SENT WITH REQUESTS
  return req.token ? !!req.token.user : false;
};



