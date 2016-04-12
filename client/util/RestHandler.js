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


module.exports = {
  Get: Get
};
