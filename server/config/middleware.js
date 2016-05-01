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
var GithubStrategy = require('passport-github2').Strategy;
var config = require('./githubAPIConfig.js');
var Promise = require('bluebird');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');


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
  app.use(express.cookieParser());
  app.use(express.session({secret: 'mysecret'}));
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
      console.log(profile)
      return done(null, {
        accessToken: accessToken,
        profile: profile
      });
    })
  }));

  passport.serializeUser(function(user, done) {
    // for the time being tou can serialize the user 
    // object {accessToken: accessToken, profile: profile }
    // In the real app you might be storing on the id like user.profile.id 
    console.log('SERIALIZE CALLED');
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    // If you are storing the whole user on session we can just pass to the done method, 
    // But if you are storing the user id you need to query your db and get the user 
    //object and pass to done() 
        console.log(user);

    done(null, user);
  });

};
