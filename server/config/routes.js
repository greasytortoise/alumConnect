var path = require('path');
var db = require('../dbConfig');
var util = require('../lib/utility.js');
var bcrypt = require('bcrypt');
var handler = require('../lib/handler');
var sharp = require('sharp');
var User = require('../models/user');

var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;

var groupRouter = require('../routers/groupRouter');
var userRouter = require('../routers/userRouter');
var siteRouter = require('../routers/siteRouter');
var fieldRouter = require('../routers/fieldRouter');
var userSiteRouter = require('../routers/userSiteRouter');
var bioRouter = require('../routers/bioRouter');
var authRouter = require('../routers/authRouter');

module.exports = function(app, express) {

  app.use('/db/groups', groupRouter);
  app.use('/db/users', userRouter);
  app.use('/db/sites', siteRouter);
  app.use('/db/fields', fieldRouter);
  app.use('/dashboard/db/users', userRouter);
  app.use('/auth', authRouter);

  app.post('/user/uploadimage', function(req, res) {
    var originFile = req.body.fileName;
    var userId = '1';
    var fileName = 'assets/photos/' + new Date().getTime() + '.jpg';
    sharp(req.file.buffer)
      .resize(800, 530)
      .crop(sharp.strategy.entropy)
      .jpeg()
      .toFile('client/' + fileName, function(err) {
        if(err) {
          console.log("ERR", err);
        }
        User.where({id: userId})
          .fetch()
          .then(function(user) {
            user.save({
              image: fileName
            })
            .then(function() {
              // Delete old image
              res.json({'fileName': fileName});
            })
            .catch(function() {
              console.log('image did not save');
            });
          })
      });
  });

  app.get('*', function (request, response) {
    console.log('directing to index');
    response.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });

};
