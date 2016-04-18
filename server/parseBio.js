var fs = require('fs');
var hr38str = fs.readFileSync('./hr38.txt', 'utf8');
var hr39str = fs.readFileSync('./hr39.txt', 'utf8');

var bioArray = [];

[hr38str, hr39str].forEach(function(giantStr) {
  var group = giantStr.split('\n\n\n\n')
  group.forEach(function(person) {
    var data = person.split('\n\n');
    bioArray.push(data);
  });
});

module.exports.bioArray = bioArray;