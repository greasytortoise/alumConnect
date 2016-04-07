var express = require('express');
var app = express();

var middleware = require('./config/middleware');
var routes = require('./config/routes');

middleware(app, express);
routes(app, express);

app.listen(3000);

module.exports = app;