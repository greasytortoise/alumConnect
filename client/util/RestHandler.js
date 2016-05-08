var request = require('superagent');
var auth = require('./authHelpers.js');

var Get = function(url, callback) {
  request
    .get(url)
    .end((err, res) => {
      err
        ? callback(err, res)
        : callback(err, res);
    });
}

var Post = function (url, data, callback) {
  if(localStorage.getItem('jwtAlum')){
    data.token = JSON.parse(localStorage.getItem('jwtAlum')).token;
  }
  request
    .post(url)
    .send(data)
    .end((err, res) => {
      if(err) {
        console.error('Err in util/restHander ', err);
      }
      callback(err, res);
  });
}

module.exports = {
  Get: Get,
  Post: Post
};
