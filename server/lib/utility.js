var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');


exports.generateToken = function(userid, user) {
  var expires = moment().add('days', 3).valueOf();
  var token = jwt.encode({
    iss: userid,
    exp: expires
  }, app.get('jwtTokenSecret'));

  return {token: token, expires: expires, user: user.toJSON()}.toJSON();

};

exports.hashAndStore = function(password) {
  bcrypt.hash(password, 10, function(err, hash) {

    //DO THING WITH HASH
  };
};


exports.comparePass = function(password, callback) {

  //GET HASHED PASSWORD FROM DB
  var storedHash;
  bcrypt.compare(password, storedHash, function(err, isMatch){
    callback(isMatch);
  });

};


exports.isLoggedIn = function(req) {
  //PROBABLY NEEDS ADJUSTMENT
  return req.token ? !!req.token.user : false;
};



