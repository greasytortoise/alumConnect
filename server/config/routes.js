var db = require('./../dbConfig');

module.exports = function(app, express) {
  app.get('/test', function(req, res) {
    res.send(200);
  });

  app.get('/testDatabase', function(req, res) {
    db.knex('users').then(function(res) {
      console.log(res);
    });
  });
};