var request = require('superagent');

var Get = function(url, callback) {
  request
    .get(url)
    .end((err, res) => {
      err
        ? console.error('Err in util/restHander ', err)
        : callback(err, res);
    });
}

var Post = function (url, data, callback) {
  request
  .post(url)
  .send(data)
  .end((err, res) => {
    err
      ? console.error('Err in util/restHander ', err)
      : callback(err, res);
  });
}

module.exports = {
  Get: Get,
  Post: Post,
  getGroups: getGroups
};
