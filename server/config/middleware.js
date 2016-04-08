var bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.set('jwtTokenSecret', 'DONALD_TRUMP_HUGE_HANDS_NO_PROBLEM');
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); 

};