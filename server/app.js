var express = require('express');
var Promise = require('bluebird');
var fs = require('fs');
var app = express();
var https = require('https');

var LEX = require('letsencrypt-express');

var ports = process.env.NODE_ENV === 'production'
  ? [80, 443]
  : [3442, 3443];

var middleware = require('./config/middleware');
var routes = require('./config/routes');

middleware(app, express);
routes(app, express);

var server = https.createServer(
  {
    key: fs.readFileSync('./tls/key.pem'),
    cert: fs.readFileSync('./tls/cert.pem')
  },
  app
);

server.listen(ports[1][7]);
app.listen(ports[0]);

module.exports = app;