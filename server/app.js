var express = require('express');
var Promise = require('bluebird');
var app = express();
var LEX = require('letsencrypt-express').testing();

var middleware = require('./config/middleware');
var routes = require('./config/routes');

middleware(app, express);
routes(app, express);

LEX.create({
  configDir: './config/letsencrypt.config'                 // ~/letsencrypt, /etc/letsencrypt, whatever you want

, onRequest: app                                    // your express app (or plain node http app)

, letsencrypt: null                                 // you can provide you own instance of letsencrypt
                                                    // if you need to configure it (with an agreeToTerms
                                                    // callback, for example)

, approveRegistration: function (hostname, cb) {    // PRODUCTION MODE needs this function, but only if you want
                                                    // automatic registration (usually not necessary)
                                                    // renewals for registered domains will still be automatic
    cb(null, {
      domains: [hostname]
    , email: 'user@example.com'
    , agreeTos: true              // you
    });
  }
}).listen([3000], [1337, 5001], function () {
  console.log("USING SSL");
});

module.exports = app;