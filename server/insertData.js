// run mysql -u root < schema.sql 
// before running this script!

var Promise = require('bluebird');
var studentFile = require('./studentData');
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
var bios = bioFile.bioArray;

for (var group in studentFile.students) {
  var people = studentFile.students[group];
  people.forEach(function(person) {
    var lower = person.name.toLowerCase();

    if (lower === 'danny tuñón') {
      lower = 'danny tunon';
    }

    var dashName = lower.split(' ').join('-');

    person.image = '/assets/' + dashName + '.jpg';
    students.push(person);
  });
}

Promise.each(groups, function(group) {
  return Groups
    .create({group_name: group});
})
.then(function(groups) {
  return Promise.each(students, function(student) {
    return Group
      .where({group_name: 'hr' + student.cohort})
      .fetch()
      .then(function(group) {
        return Users
          .create({
            username: student.name,
            password: 'password',
            email: 'email@mail.com',
            image: student.image,
            Group_id: group.id,
            public: 0,
            permission: 0
          }); 
        
      });

  });
})
// .then(function(groups) {
//   return Promise.each(bios, function(studentBio) {
//     return User
//       .where({username: studentBio[0]})
//       .fetch()
//       .then(function(user) {
//         return Promise.each(user, );
//       });
//   });
// })
.then(function() {
  console.log('done!');
  db.knex.destroy();
});