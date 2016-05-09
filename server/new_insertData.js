// run mysql -u root < schema.sql
// before running this script!

var Promise = require('bluebird');
var studentFile = require('./data/studentData');
var bioFile = require('./parseBio');

var request = require('request');
var db = require('./dbConfig');
var User = require('./models/user');
var Users = require('./collections/users');
var Group = require('./models/group');
var Groups = require('./collections/groups');
var Bio = require('./models/bio');
var Bios = require('./collections/bios');

var groups = ['hr36', 'hr37', 'hr38', 'hr39', 'hr40', 'hr41'];
var students = [];
var biographies = bioFile.bioArray;

for (var group in studentFile.students) {
  var people = studentFile.students[group];
  people.forEach(function(person) {
    var lower = person.name.toLowerCase();

    if (lower === 'danny tuñón') {
      lower = 'danny tunon';
    }
    var dashName = lower.split(' ');
    person.image = '/assets/photos/' + dashName.join('-') + '.jpg';
    person.email = dashName.join('_') + '@hr.com'

    students.push(person);
  });
}

Promise.each(groups, function(group) {
  return Groups
    .create({group_name: group});
})
.then(function() {
  return Promise.each(students, function(student) {
    return Group
      .where({group_name: 'hr' + student.cohort})
      .fetch()
      .then(function(group) {
        return Users
          .create({
            name: student.name,
            email: student.email,
            image: student.image,
            url_hash: 'n/a',
            public: 0,
            permission: 0
          })
          .then(function(user) {
            user.groups().attach(group);
          });

      });

  });
})
.then(function() {
  return Promise.each(biographies, function(studentBio) {
    // console.log(studentBio[0]);
    return User
      .where({name: studentBio[0]})
      .fetch()
      .then(function(user) {
        // console.log(user);
        if (user) {
          return Promise.each(studentBio, function(description, index) {
            if (index > 6) {
              console.log(studentBio[0]);

            }
            if (index > 0) {
              Bios.create({
                bio: description,
                User_id: user.id,
                Bio_Field_id: index
              });
            }
          });
        } else {
          // these guys don't have thier name match with the site
          // console.log(studentBio[0]);
        }
      });
  });
})
.then(function() {
  console.log('done!');
  db.knex.destroy();
});