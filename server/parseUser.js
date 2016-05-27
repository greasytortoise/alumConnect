var fs = require('fs');
var hr40str = fs.readFileSync(__dirname + '/data/hr40info.txt', 'utf8');
var hr41str = fs.readFileSync(__dirname + '/data/hr41info.txt', 'utf8');

var groups = [hr41str, hr40str];
var userArray = [];

groups.forEach(function(giantStr) {
  var group = giantStr.split('\n\n');
  group.forEach(function(person) {
    var data = person.split(' ');
    userArray.push(data);
  });
});

module.exports.userArray = userArray;
