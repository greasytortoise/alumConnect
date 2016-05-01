var bodyParser = require('body-parser');
var util = require('../lib/utility.js');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/assets')
  },
  filename: function (req, file, cb) {
    // console.log(req)
    console.dir(file);
    cb(null, file.originalname)
  }
});
var upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1000 * 500} // 500kb
});

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var config = require('./githubAPIConfig.js');
var Promise = require('bluebird');

module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(upload.single('upl'));
  app.use(function(err, req, res, next) {
    if(err.code = 'LIMIT_FILE_SIZE') {
      console.log('image upload limited to 500kb');
    }
  });
  app.use(express.cookieParser());
  app.use(express.session({secret: 'mysecret'}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GithubStrategy({
    clientID: config.githubClientId,
    clientSecret: config.githubClientSecret,
    callbackURL: config.githubCallbackUrl
  }, function(accessToken, refreshToken, profile, done){
    console.log(accessToken);
    console.log(profile);
    done(null, {
      accessToken: accessToken,
      profile: profile
    });
  }));

  passport.serializeUser(function(user, done) {
    // for the time being tou can serialize the user 
    // object {accessToken: accessToken, profile: profile }
    // In the real app you might be storing on the id like user.profile.id 
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    // If you are storing the whole user on session we can just pass to the done method, 
    // But if you are storing the user id you need to query your db and get the user 
    //object and pass to done() 
    done(null, user);
  });

};
