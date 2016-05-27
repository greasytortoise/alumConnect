// run mysql -u root < schema.sql
// before running this script!

var Promise = require('bluebird');
var studentFile = require('./data/studentData');
var bioFile = require('./parseBio');
var userFile = require('./parseUser');

var request = require('request');
var db = require('./dbConfig');
var User = require('./models/user');
var Users = require('./collections/users');
var Group = require('./models/group');
var Groups = require('./collections/groups');
var Bio = require('./models/bio');
var Bios = require('./collections/bios');
var User_Site = require('./models/userSite');
var User_Sites = require('./collections/userSites');

var groups = ['HR36', 'HR37', 'HR38', 'HR39', 'HR40', 'HR41' ];
var students = [];
var biographies = bioFile.bioArray;
var userInfos = userFile.userArray;

for (var group in studentFile.students) {
  var people = studentFile.students[group];
  people.forEach(function(person) {
    var lower = person.name.toLowerCase();

    if (lower === 'danny tuñón') {
      lower = 'danny tunon';
    }
    var dashName = lower.split(' ');
    person.image = '/assets/photos/' + dashName.join('-') + '.jpg';
    // person.email = dashName.join('_') + '@hr.com'

    students.push(person);
  });
}

userInfos.forEach(function(userInfo, index) {
  // userInfo[0] is first name
  // userInfo[1] is first name
  // userInfo[2] is last name
  // userInfo[3] is github
  // userInfo[4] is email

  var firstname = userInfo[1];
  var lastName = userInfo[2];

  var lower = userInfo[1].toLowerCase() + ' ' + userInfo[2].toLowerCase();

  var github = userInfo[3];
  var email = userInfo[4];

  students[index + 153].github = github;
  students[index + 153].email = email;
});

Promise.each(groups, function(group) {
  return Groups
    .create({group_name: group});
})
.then(function() {
  return Promise.each(students, function(student) {
    return Group
      .where({group_name: 'HR' + student.cohort})
      .fetch()
      .then(function(group) {
        return Users
          .create({
            name: student.name,
            email: student.email,
            image: student.image,
            url_hash: 'n/a',
            public: 1,
            permission: 0,
            handle: student.github
          })
          .then(function(user) {
            user
              .groups()
              .attach(group)
                .then(function(group) {
                  User_Sites.create({
                    User_id: user.id,
                    Site_id: 4,
                    rest_url: user.get('handle')
                  });
                })
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
