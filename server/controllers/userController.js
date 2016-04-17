var User = require('../models/user');
var Users = require('../collections/users');

var Group = require('../models/group');
var Groups = require('../collections/groups');

var UserSite = require('../models/userSite');
var UserSites = require('../collections/userSites');

var Bio = require('../models/bio');
var Bios = require('../collections/bios');

var Promise = require('bluebird');

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
  // no error handling yet
  createUser: function(req, res) {
    var data = req.body;

    Users
      .create({
        username: data.user.username,
        password: data.user.password,
        email: data.user.email,
        image: data.user.image,
        // url_hash: data.user.url,
        Group_id: group.id,
        public: 0,
        permission: 0
      })
      .then(function() {
        res.status(201).send('user is created!');
      });
  },
  // http://localhost:3000/db/users/user/:id
  // no error handling yet
  modifyUser: function(req, res) {
    var id = req.params.id;
    var data = req.body;

    // grab user and join groups + userSites + bios
    User
      .where({id: id})
      .fetch({withRelated: ['groups', 'userSites', 'bios']})
      .then(function(user) {

        // join sites
        user
          .related('userSites')
          .fetch({withRealted: ['sites']})
          .then(function(userSites) {

            // join bioFields
            user
              .related('bios')
              .fetch({withRelated: ['bioFields']})
              .then(function(bios) {
                var group = user.related('groups');

                // modify user info
                user
                  .save({
                    username: data.user.username || user.get('username'),
                    password: data.user.password || user.get('password'),
                    email: data.user.email || user.get('email'),
                    image: data.user.image || user.get('image'),
                    url_hash: data.user.url || user.get('url_hash'),
                    Group_id: group.id
                  })
                  .then(function(user) {
                    // for each site in the array
                      // if it exists
                        // if it has a value then modify it
                        // else delete it
                      // else, create it
                    return Promise.map(data.sites, function(site) {
                      return userSites
                        .query(function(qb) {
                          qb.where('User_id', '=', id)
                            .andWhere('Site_id', '=', site.id);
                        })
                        .fetch()
                        .then(function(userSite) {
                          if (userSite.at(0)) {
                            userSite.at(0).save({
                              rest_url: site.value || userSite.get('rest_url')
                            });
                          } else {
                            userSites.create({
                              rest_url: site.value,
                              User_id: user.id,
                              Site_id: site.id              
                            });
                          }
                        });
                    });
                  })
                  .then(function() {
                    // for each bio in the array
                    // if it exists, modify it
                    // else, create it
                    return Promise.map(data.userInfo, function(info) {
                      return bios
                        .query(function(qb) {
                          qb.where('User_id', '=', id)
                            .andWhere('Bio_Field_id', '=', info.id);
                        })
                        .fetch()
                        .then(function(bio) {
                          if (bio.at(0)) {
                            bio.at(0).save({
                              bio: info.value || bio.get('bio')
                            });
                          } else {
                            bios.create({
                              bio: info.value,
                              User_id: user.id,
                              Bio_Field_id: info.id                             
                            });
                          }
                        });
                    });

                  }).then(function() {
                    res.send(201);
                  });
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
