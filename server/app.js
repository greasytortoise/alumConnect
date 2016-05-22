var express = require('express');
var Promise = require('bluebird');
var os = require('os');
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var config = require('./config/githubAPIConfig.js');

var app = express();

var LEX = require('letsencrypt-express').testing();

var middleware = require('./config/middleware');
var routes = require('./config/routes');

middleware(app, express);
routes(app, express);


var lex = LEX.create({
  configDir: '/etc/letsencrypt',
  approveRegistration: function (hostname, cb) {
    cb(null, {
      domains: ['hackreactorconnect.com'],
      email: 'bresnan.mw@gmail.com',
      agreeTos: true,
    });
  }
});

lex.onRequest = app;

lex.listen([3000], [80, 5001], function () {
  var protocol = ('requestCert' in this) ? 'https' : 'http';
  console.log("Listening at " + protocol + '://localhost:' + this.address().port);
});

module.exports = app;
