var express = require('express');
var Promise = require('bluebird');
var app = express();


var LEX = require('letsencrypt-express');

var middleware = require('./config/middleware');
var routes = require('./config/routes');

middleware(app, express);
routes(app, express);


var lex = LEX.create({
  configDir: '../tls/',
  approveRegistration: function (hostname, cb) {
    cb(null, {
      domains: ['donkit.com'],
      email: 'bresnan.mw@gmail.com',
      agreeTos: true,
    });
  }
});

lex.onRequest = app;

lex.listen([3000], [1337, 5001], function () {
  var protocol = ('requestCert' in this) ? 'https': 'http';
  console.log("Listening at " + protocol + '://localhost:' + this.address().port);
});

module.exports = app;