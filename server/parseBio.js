var fs = require('fs');
var hr38str = fs.readFileSync(__dirname + '/data/hr38.txt', 'utf8');
var hr39str = fs.readFileSync(__dirname + '/data/hr39.txt', 'utf8');
var hr40str = fs.readFileSync(__dirname + '/data/hr40.txt', 'utf8');
var hr41str = fs.readFileSync(__dirname + '/data/hr41.txt', 'utf8');

var groups = [hr38str, hr39str, hr40str, hr41str];
var bioArray = [];

groups.forEach(function(giantStr) {
  var group = giantStr.split('\n\n\n\n')
  group.forEach(function(person) {
    var data = person.split('\n\n')
      .map(function(datum) {
        // there is a weird '-' character that is not showing up
        // after \n
        // return datum.replace(/\n­$/g, '').trim();
        return datum.trim();
      });

    bioArray.push(data);
  });
});

module.exports.bioArray = bioArray;