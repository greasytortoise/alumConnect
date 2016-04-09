var bodyParser = require('body-parser');
var util = require('../lib/utility.js');
module.exports = function(app, express) {
  
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.set('jwtTokenSecret', 'DONALD_TRUMP_HUGE_HANDS_NO_PROBLEM');

};

