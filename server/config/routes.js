var path = require('path');
var db = require('../dbConfig');
var util = require('../lib/utility.js');
var bcrypt = require('bcrypt');
var handler = require('../lib/handler');
var sharp = require('sharp');


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

    console.log(req.file);
    // console.log(req.file.buffer);

    sharp(req.file.buffer)
      .resize(800, 530)
      .crop(sharp.strategy.entropy)
      .jpeg()
      .toFile('client/assets/uploads/output.jpg', function(err) {
        // output.jpg is a 300 pixels wide and 200 pixels high image
        // containing a scaled and cropped version of input.jpg
        res.status(204).end();

      });

  });

  app.get('*', function (request, response) {
    console.log('directing to index');
    response.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });

};
