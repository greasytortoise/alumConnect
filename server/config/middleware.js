var bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.set('jwtTokenSecret', 'DONALD_TRUMP_HUGE_HANDS_NO_PROBLEM');
};