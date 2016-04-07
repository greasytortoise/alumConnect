module.exports = function(app, express) {
  app.get('/test', function(req, res) {
    res.send(200);
  });
};