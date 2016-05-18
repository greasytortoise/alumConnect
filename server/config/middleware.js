var bodyParser = require('body-parser');
var redisClient = require('redis').createClient();
var path = require('path');
var util = require('../lib/utility.js');
var multer  = require('multer');
var sharp = require('sharp');
const configWP = require('../../webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

var memstorage = multer.memoryStorage();
var upload = multer({
  storage: memstorage,
  limits: { fileSize: 1 * 1000 * 500 }, // 500kb
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
  var RedisStore = require('connect-redis')(session);

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });
  const compiler = webpack(configWP);

  if (process.env.NODE_ENV !== 'production') {
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: configWP.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
  }

  app.use(bodyParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(__dirname + '/../../client/'));

  // app.use(upload.single('upl'));
  app.use(upload.single('photo'));
  app.use(function(err, req, res, next) {
    console.log('content length: ', req.headers['content-length']);
    if (err.code = 'LIMIT_FILE_SIZE') {
      console.log('image upload limited to 500kb');
    }
  });
  app.use(require('morgan')('dev'));
  app.use(cookieParser(config.sessionSecret));

  app.use(session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      db: 0,
      client: redisClient,
    }),
    cookie: { maxAge: (24 * 3600 * 1000 * 7) }, // 7 Days in ms
    secret: config.sessionSecret,
  }));

  app.use(methodOverride());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GithubStrategy({
    clientID: config.githubClientId,
    clientSecret: config.githubClientSecret,
    callbackURL: config.githubCallbackUrl
  }, function(accessToken, refreshToken, profile, done){
    process.nextTick(function() {

      var profileObj = {
        githubid: profile.id,
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
    User.where({githubid: userObj.userData.githubid }).fetch({ withRelated: ['groups'] })
      .then(function(user) {
        if (!user) {
          done(null, null);
        }
        var groups = user.related('groups');
        console.log(groups);
        var userObj = {
            id: user.id,
            handle: user.get('handle'),
            githubid: user.get('githubid'),
            name: user.get('name'),
            url: user.get('url_hash'),
            email: user.get('email'),
            image: user.get('image'),
            public: user.get('public'),
            group_id: groups.id,
            group: groups.get('group_name'),
            permission: user.get('permission'),
            groups: groups.reduce(function(prev, group) {
              prev[group.id] = group.get('group_name');
              return prev;
            }, {}),
        };
        done(null, userObj);
      });
  });

};
