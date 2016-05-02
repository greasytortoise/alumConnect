var path = require('path')
var db = require('../dbConfig');
var util = require('../lib/utility.js');
var bcrypt = require('bcrypt');
var handler = require('../lib/handler');

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/assets')
  },
  filename: function (req, file, cb) {
    console.log(req.body)
    console.log(file);
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })



var groupRouter = require('../routers/groupRouter');
var userRouter = require('../routers/userRouter');
var siteRouter = require('../routers/siteRouter');
var fieldRouter = require('../routers/fieldRouter');
var userSiteRouter = require('../routers/userSiteRouter');
var bioRouter = require('../routers/bioRouter');

module.exports = function(app, express) {
  app.use('/db/groups', groupRouter);
  app.use('/db/users', userRouter);
  app.use('/db/sites', siteRouter);
  app.use('/db/fields', fieldRouter);
  app.use('/dashboard/db/users', userRouter);

  app.post('/checktoken', util.getPermissions);
  app.post('/login', handler.checkLogin);

  app.post('/user/uploadimage',upload.single('upl'), function(req, res) {
    // console.log(req.body); //form fields
    // /* example output:
    // { title: 'abc' }
    //  */
    // console.log(req.file); //form files
    /* example output:
              { fieldname: 'upl',
                originalname: 'grumpy.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './uploads/',
                filename: '436ec561793aa4dc475a88e84776b1b9',
                path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
                size: 277056 }
     */
    res.status(204).end();
  })

  app.post('/changepassword', function(req, res) {
    var tokenUserData = req.token.split('.')[1].user;
    Users.where({id: tokenUserData.id}).fetch().then(function(user){
      bcrypt.hash(req.body.password, 10, function(err, hash) {

        //DO THING WITH HASH
        //SAVE NEW PW TO DB!

      });
    });
  });

  app.get('*', function (request, response){
    console.log('directing to index');
    response.sendFile(path.resolve(__dirname,  '../../client/index.html'))
  });
};
