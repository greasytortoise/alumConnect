var bodyParser = require('body-parser');
var util = require('../lib/utility.js');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/assets')
  },
  filename: function (req, file, cb) {
    // console.log(req)
    console.dir(file);
    cb(null, file.originalname)
  }
});
var upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1000 * 500} // 500kb
});


module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  app.use(upload.single('upl'));
  app.use(function(err, req, res, next) {
    if(err.code = 'LIMIT_FILE_SIZE') {
      console.log('image upload limited to 500kb');
    }
  });
};
