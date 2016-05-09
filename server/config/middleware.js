var bodyParser = require('body-parser');
var util = require('../lib/utility.js');
var multer  = require('multer');
var sharp = require('sharp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/assets')
  },
  filename: function (req, file, cb) {
    console.dir(file)
    // console.dir(file);
    cb(null, file.originalname)
  }
});
var memstorage = multer.memoryStorage()
var upload = multer({
  storage: memstorage,
  limits: { fileSize: 1 * 1000 * 500} // 500kb
});

var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var config = require('./githubAPIConfig.js');
var Promise = require('bluebird');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var User = require('../models/user');
var Users = require('../collections/users');


module.exports = function(app, express) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });
  app.use(bodyParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(__dirname + '/../../client'));
  app.use(upload.single('upl'));
  app.use(function(err, req, res, next) {
    if(err.code = 'LIMIT_FILE_SIZE') {
      console.log('image upload limited to 500kb');
    }
  });
  app.use(cookieParser());
  app.use(session({secret: config.sessionSecret}));
  app.use(methodOverride());
  app.use(cookieParser(config.sessionSecret));
  app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GithubStrategy({
    clientID: config.githubClientId,
    clientSecret: config.githubClientSecret,
    callbackURL: config.githubCallbackUrl
  }, function(accessToken, refreshToken, profile, done){
    process.nextTick(function() {

      var profileObj = {
        id: profile.id,
        handle: profile.username
      };
      return done(null, {
        accessToken: accessToken,
        userData: profileObj
      });
    })
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(userObj, done) {
    // If you are storing the whole user on session we can just pass to the done method,
    // But if you are storing the user id you need to query your db and get the user
    //object and pass to done()
    // User.where({handle: userObj.userData.handle }).fetch()
    //   .then(function(user) {
    //     if (!user) {
    //       done(null, null);
    //     } else {
    //       done(null, user);
    //     }

    //   });

    done(null, userObj);
  });

};
