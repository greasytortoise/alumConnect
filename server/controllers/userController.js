var User = require('../models/user');
var Users = require('../collections/users');

var Group = require('../models/group');
var Groups = require('../collections/groups');

var UserSite = require('../models/userSite');
var UserSites = require('../collections/userSites');

var Bio = require('../models/bio');
var Bios = require('../collections/bios');

module.exports = {
  // http://localhost:3000/db/users
  fetchUsers: function(req, res) {
    Users.fetch({withRelated: ['groups']})
      .then(function(users) {
        var retObj = users.map(function(user) {
          var group = user.related('groups');
          return {
            id: user.id,
            username: user.get('username'),
            password: user.get('password'),
            url: user.get('url_hash'),
            image: user.get('image'),
            email: user.get('email'),
            group: group.get('group_name')
          };
        });
        res.status(200).send(retObj);
    });
  },
  // http://localhost:3000/db/users/group/:id
  fetchUsersByGroup: function(req, res) {
    var groupId = req.params.id;
    Users
      .query('where', 'Group_id', '=', groupId)
      .fetch()
      .then(function(users) {
        var retObj = users.map(function(user) {
          return {
            id: user.id,
            username: user.get('username'),
            password: user.get('password'),
            url: user.get('url_hash'),
            image: user.get('image'),
            email: user.get('email')
          };
        });
        res.json(retObj);
    });
  },
  // http://localhost:3000/db/users/user/:id
  fetchUserInfo: function(req, res) {
    var id = req.params.id;

    // user join with groups + bios + userSites
    User
      .where({id: id})
      .fetch({withRelated: ['groups', 'bios', 'userSites']})
      .then(function(user) {
        if (!user) {
          return res.status(404).send('user does not exist!');
        }

        // userSites join with sites
        user
          .related('userSites')
          .fetch({withRelated: ['sites']})
          .then(function(userSites) {

            // bios join with bioFields
            user
              .related('bios')
              .fetch({withRelated: ['bioFields']})
              .then(function(bios) {
                var group = user.related('groups');

                // return one giant blob
                var retObj = {
                  user: {
                    id: user.id,
                    username: user.get('username'),
                    password: user.get('password'),
                    url: user.get('url_hash'),
                    email: user.get('email'),
                    group: group.get('group_name'),
                    image: user.get('image')
                  },
                  sites: userSites.map(function(userSite) {
                    var site = userSite.related('sites');
                    return {
                      id: site.id,
                      name: site.get('site_name'),
                      url: site.get('base_url'),
                      value: userSite.get('rest_url')
                    };
                  }),
                  userInfo: bios.map(function(bio) {
                    var bioField = bio.related('bioFields');
                    return {
                      id: bioField.id,
                      title: bioField.get('title'),
                      value: bio.get('bio')
                    };
                  })
                };
                res.json(retObj);
            });
        });
    });
  },
  // http://localhost:3000/db/users
  // need admin permission to create a user
  createUser: function(req, res) {
    var data = req.body;

    Group
      .where({group_name: data.user.group})
      .fetch()
      .then(function(group) {
        return new User({
          // permission and public are not dealt with yet...
          username: data.user.username,
          password: data.user.password,
          email: data.user.email,
          image: data.user.image,
          // url_hash: data.user.url,
          Group_id: group.id,
          public: 0,
          permission: 0
        })
        .save()
        .then(function(user) {
          // may run into async issues
          data.sites.forEach(function(site) {
            UserSites.create({
              rest_url: site.value,
              User_id: user.id,
              Site_id: site.id
            });
          });
          return user;
        })
        .then(function(user) {
          // may run into async issues
          data.userInfo.forEach(function(info) {
            Bios.create({
              bio: info.value,
              User_id: user.id,
              Bio_Field_id: info.id
            });
          });
        })
        .then(function() {
          res.send(201);
        });
    });
  },
  // http://localhost:3000/db/users/user/:id
  // no error handling yet
  modifyUser: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    Group.where({group_name: data.user.group}).fetch().then(function(group) {
      User.where({id: id}).fetch().then(function(user) {
        return user.save({
          username: data.user.username || user.get('username'),
          password: data.user.password || user.get('password'),
          email: data.user.email || user.get('email'),
          image: data.user.image || user.get('image'),
          url_hash: data.user.url || user.get('url_hash'),
          Group_id: group.id
        }).then(function(user) {
          // site is not changeable (only its value is)
          data.sites.forEach(function(site) {
            UserSite.where({User_id: id, Site_id: site.id}).fetch().then(function(userSite) {
              userSite.save({
                rest_url: site.value || userSite.get('rest_url')
              });
            });
          });
          return user;
        }).then(function(user) {
          data.userInfo.forEach(function(info) {
            Bio.where({User_id: id, Bio_Field_id: info.id}).fetch().then(function(bio) {
              bio.save({
                bio: info.value || bio.get('bio')
              });
            });
          });
        }).then(function() {
          res.send(201);
        });
      });
    });

  },
  // http://localhost:3000/db/users/user/:id
  deleteUser: function(req, res) {
    var id = req.params.id;
    User
      .where({id: id})
      .destroy()
      .then(function() {
        res.status(201).send('deleted!');
      });
  }
}
