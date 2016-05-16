var db = require('../dbConfig');
var User = require('../models/user');
var Users = require('../collections/users');

var Promise = require('bluebird');

module.exports = {
  // http://localhost:3000/db/users
  // fetchUsers: function(req, res) {
  //   Users.fetch({withRelated: ['groups']})
  //     .then(function(users) {
  //       var retObj = users.map(function(user) {
  //         var group = user.related('groups');
  //         return {
  //           /*

  //           MODIFICATIONS HERE


  //           */
  //           id: user.id,
  //           username: user.get('username'),
  //           password: user.get('password'),
  //           url: user.get('url_hash'),
  //           image: user.get('image'),
  //           email: user.get('email'),
  //           group: group.get('group_name')
  //         };
  //       });
  //       res.status(200).send(retObj);
  //   });
  // },
  // // http://localhost:3000/db/users/group/:id
  // fetchUsersByGroup: function(req, res) {
  //   var groupId = req.params.id;
  //   Users
  //     .query('where', 'Group_id', '=', groupId)
  //     .fetch()
  //     .then(function(users) {
  //       var retObj = users.map(function(user) {
  //         return {
  //                       /*

  //           MODIFICATIONS HERE


  //           */
  //           id: user.id,
  //           username: user.get('username'),
  //           password: user.get('password'),
  //           url: user.get('url_hash'),
  //           image: user.get('image'),
  //           email: user.get('email')
  //         };
  //       });
  //       res.json(retObj);
  //   });
  // },
  // // http://localhost:3000/db/users/user/:id
  // fetchUserInfo: function(req, res) {
  //   var id = req.params.id;

  //   // user join with groups + bios + userSites
  //   User
  //     .where({id: id})
  //     .fetch({withRelated: ['groups', 'bios', 'userSites']})
  //     .then(function(user) {
  //       if (!user) {
  //         return res.status(404).send('user does not exist!');
  //       }

  //       // userSites join with sites
  //       user
  //         .related('userSites')
  //         .fetch({withRelated: ['sites']})
  //         .then(function(userSites) {

  //           // bios join with bioFields
  //           user
  //             .related('bios')
  //             .fetch({withRelated: ['bioFields']})
  //             .then(function(bios) {
  //               var group = user.related('groups');

  //               // return one giant blob
  //               /*

  //               MODIFICATIONS HERE


  //               */
  //               var retObj = {
  //                 user: {
  //                   id: user.id,
  //                   username: user.get('username'),
  //                   password: user.get('password'),
  //                   url: user.get('url_hash'),
  //                   email: user.get('email'),
  //                   group_id: group.id,
  //                   group: group.get('group_name'),
  //                   image: user.get('image')
  //                 },
  //                 sites: userSites.map(function(userSite) {
  //                   var site = userSite.related('sites');
  //                   return {
  //                     id: site.id,
  //                     site_name: site.get('site_name'),
  //                     base_url: site.get('base_url'),
  //                     value: userSite.get('rest_url')
  //                   };
  //                 }),
  //                 userInfo: bios.map(function(bio) {
  //                   var bioField = bio.related('bioFields');
  //                   return {
  //                     id: bioField.id,
  //                     title: bioField.get('title'),
  //                     value: bio.get('bio')
  //                   };
  //                 })
  //               };
  //               res.json(retObj);
  //           });
  //       });
  //   });
  // },
  // // http://localhost:3000/db/users
  // // no error handling yet
  // createUser: function(req, res) {
  //   var data = req.body;
  //    /*

  //    MODIFICATIONS HERE


  //    */
  //   Users
  //     .create({
  //       username: data.user.username,
  //       password: data.user.password,
  //       email: data.user.email,
  //       image: data.user.image,
  //       // url_hash: data.user.url,
  //       Group_id: data.user.group,
  //       public: data.user.public,
  //       permission: data.user.permission
  //     })
  //     .then(function() {
  //       res.status(201).send('user is created!');
  //     });
  // },
  // // http://localhost:3000/db/users/user/:id
  // // no error handling yet
  // modifyUser: function(req, res) {
  //   var id = req.params.id;
  //   var data = req.body;
  //   console.log('from user: ', data);
  //   // grab user and join groups + userSites + bios
  //   User
  //     .where({id: id})
  //     .fetch({withRelated: ['groups', 'userSites', 'bios']})
  //     .then(function(user) {

  //       // join sites
  //       user
  //         .related('userSites')
  //         .fetch({withRealted: ['sites']})
  //         .then(function(userSites) {

  //           // join bioFields
  //           user
  //             .related('bios')
  //             .fetch({withRelated: ['bioFields']})
  //             .then(function(bios) {
  //               var group = user.related('groups');

  //               // modify user info

  //               /*

  //               MODIFICATIONS HERE


  //               */
  //               user
  //                 .save({
  //                   username: data.user.username,
  //                   password: data.user.password,
  //                   email: data.user.email,
  //                   image: data.user.image,
  //                   url_hash: data.user.url,
  //                   Group_id: group.id
  //                 })
  //                 .then(function(user) {
  //                   // for each site in the array
  //                     // if it exists
  //                       // if it has a value then modify it
  //                       // else delete it
  //                     // else, create it
  //                   return Promise.each(data.sites, function(site) {
  //                     return userSites
  //                       .query(function(qb) {
  //                         qb.where('User_id', '=', id)
  //                           .andWhere('Site_id', '=', site.id);
  //                       })
  //                       .fetch()
  //                       .then(function(userSite) {
  //                         if (userSite.at(0)) {
  //                           userSite.at(0).save({
  //                             rest_url: site.value
  //                           });
  //                         } else {
  //                           userSites.create({
  //                             rest_url: site.value,
  //                             User_id: user.id,
  //                             Site_id: site.id
  //                           });
  //                         }
  //                       });
  //                   });
  //                 })
  //                 .then(function() {
  //                   // for each bio in the array
  //                   // if it exists, modify it
  //                   // else, create it
  //                   return Promise.each(data.userInfo, function(info) {
  //                     return bios
  //                       .query(function(qb) {
  //                         qb.where('User_id', '=', id)
  //                           .andWhere('Bio_Field_id', '=', info.id);
  //                       })
  //                       .fetch()
  //                       .then(function(bio) {
  //                         if (bio.at(0)) {
  //                           bio.at(0).save({
  //                             bio: info.value || bio.get('bio')
  //                           });
  //                         } else {
  //                           bios.create({
  //                             bio: info.value,
  //                             User_id: user.id,
  //                             Bio_Field_id: info.id
  //                           });
  //                         }
  //                       });
  //                   });
  //                 })
  //                 .then(function() {
  //                   res.send(201);
  //                 });
  //             });
  //         });

  //     });
  // },

  // // http://localhost:3000/db/users/user/:id
  // deleteUser: function(req, res) {
  //   var id = req.params.id;
  //   User
  //     .where({id: id})
  //     .destroy()
  //     .then(function() {
  //       res.status(201).send('deleted!');
  //     });
  // },


  fetchUsers2: function(req, res) {
    Users
      .fetch({withRelated: ['groups']})
      .then(function(users) {
        var retObj = users.map(function(user) {
          var groups = user.related('groups');
          return {
            id: user.id,
            handle: user.get('handle'),
            githubid: user.get('githubid'),
            name: user.get('name'),
            public: user.get('public'),
            url: user.get('url_hash'),
            image: user.get('image'),
            email: user.get('email'),
            groups: groups.reduce(function(prev, group) {
              prev[group.id] = group.get('group_name');
              return prev;
            }, {})
          };
        });
        res.status(200).send(retObj);
    });
  },

  fetchUsersByGroup2: function(req, res) {
    var groupId = req.params.id;
    Users
      .fetch({withRelated: ['groups']})
      .then(function(users) {
        // console.log(users);
        var retObj = users.map(function(user) {
          var groups = user.related('groups');
          return {
            id: user.id,
            handle: user.get('handle'),
            githubid: user.get('githubid'),
            name: user.get('name'),
            url: user.get('url_hash'),
            image: user.get('image'),
            email: user.get('email'),
            groups: groups.reduce(function(prev, group) {
              prev[group.id] = group.get('group_name');
              return prev;
            }, {})
          };
        });
        res.json(retObj);
    });
  },

  createUser2: function(req, res) {
    var data = req.body;
    Users
      .create({
        handle: data.user.handle,
        githubid: data.user.githubid,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image,
        // url_hash: data.user.url,
        public: 1,
        permission: data.user.admin || 0,
      })
      .then(function(user) {
        // console.log(groups_users);
        return Promise.each(data.groups, function(group) {
          user.groups().attach(group);
        });
      })
      .then(function() {
        res.status(201).send('user is created!');
      })
      .catch(function(err) {
        throw err;
        res.status(500).send('error creating user');
      });
    },

  fetchUserInfo2: function(req, res) {
    var id = req.params.id;
    console.log(req.params.id);
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
                var groups = user.related('groups');

                var retObj = {
                  user: {
                    id: user.id,
                    handle: user.get('handle'),
                    githubid: user.get('githubid'),
                    name: user.get('name'),
                    url: user.get('url_hash'),
                    email: user.get('email'),
                    group_id: groups.id,
                    group: groups.get('group_name'),
                    image: user.get('image'),
                    public: user.get('public'),
                  },
                  sites: userSites.map(function(userSite) {
                    var site = userSite.related('sites');
                    return {
                      id: site.id,
                      site_name: site.get('site_name'),
                      base_url: site.get('base_url'),
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
                  }),
                  groups: groups.reduce(function(prev, group) {
                    prev[group.id] = group.get('group_name');
                    return prev;
                  }, {})
                };
                res.json(retObj);
            });
        });
    });
  },

  // modifyUser2: function(req, res) {
  // http://localhost:3000/db/users
  // no error handling yet

  // http://localhost:3000/db/users/user/:id
  // no error handling yet
  modifyUser2: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    // console.log('from user: ', data);
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
                var groups = user.related('groups');

                // modify user info

                /*

                MODIFICATIONS HERE


                */

                user
                  .save({
                    handle: data.user.handle,
                    githubid: data.user.githubid,
                    name: user.get('name'),
                    email: data.user.email,
                    image: data.user.image,
                    url_hash: data.user.url,
                    permission: data.user.permission === 0 ? 0 : 1,
                    public: data.user.public === 0 ? 0 : 1,
                  })
                  .then(function(user) {
                    // for each site in the array
                      // if it exists
                        // if it has a value then modify it
                        // else delete it
                      // else, create it
                    return Promise.each(data.sites, function(site) {
                      return userSites
                        .query(function(qb) {
                          qb.where('User_id', '=', id)
                            .andWhere('Site_id', '=', site.id);
                        })
                        .fetch()
                        .then(function(userSite) {
                          if (userSite.at(0)) {
                            userSite.at(0).save({
                              rest_url: site.value
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
                    return Promise.each(data.userInfo, function(info) {
                      return bios
                        .query(function(qb) {
                          qb.where('User_id', '=', id)
                            .andWhere('Bio_Field_id', '=', info.id);
                        })
                        .fetch()
                        .then(function(bio) {
                          if (bio.at(0)) {
                            bio.at(0).save({
                              bio: info.value
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
                  })
                  .then(function() {
                    return Promise.each(groups.models, function(group) {
                      return db.knex('Groups_Users')
                        .where({
                          Group_id: group.id,
                          User_id: id
                        })
                        .del()
                    })
                    .then(function() {
                      return Promise.each(data.groups, function(group) {
                        console.log('group is: ', group);
                        user.groups().attach(group);
                      });
                    });
                  })
                  .then(function() {
                    res.send(201);
                  });
              });
          });

      });
  },

  deleteUser2: function(req, res) {
    var id = req.params.id;
    User
      .where({id: id})
      .destroy()
      .then(function() {
        res.status(201).send('deleted!');
      });
  },

  toggleVisible: (req, res) => {
    const id = req.body.id;
    User
      .where({ id: id })
      .then((user) => {
        const newVis = user.get('public') === 1 ? 0 : 1;
        user.set('public', newVis);
        user.save();
        res.status(200).send('Updated');
      });
  },
};
