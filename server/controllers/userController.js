var db = require('../dbConfig');
var User = require('../models/user');
var Users = require('../collections/users');
var util = require('../lib/utility.js');
var Promise = require('bluebird');
var Groups_Vis = require('../collections/groups_users.js');

module.exports = {
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

  //for filtering

  fetchUsers3: function(req, res) {
    Users
      .fetch({withRelated: ['groups']})
      .then(function(users) {
        util.filterUsers(users.map(function(user) {
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
            }, {}),
          };
        }), req.user.id)
        .then((results) => {
          res.status(200).send(results);
        });
    });

  },

  fetchUsersByGroup2: function(req, res) {
    var groupId = req.params.id;
    console.log(req.user);
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
        public: 1,
        permission: data.user.admin || 0,
      })
      .then(function(user) {
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
                    permission: user.get('permission'),
                  },
                  sites: userSites.reduce(function(pre, userSite) {
                    var site = userSite.related('sites');
                    pre[site.id] = {
                      site_name: site.get('site_name'),
                      base_url: site.get('base_url'),
                      value: userSite.get('rest_url')
                    };
                    return pre;
                  }, {}),
                  userInfo: bios.reduce(function(pre, bio) {
                    var bioField = bio.related('bioFields');
                    pre[bioField.id] = {
                      title: bioField.get('title'),
                      value: bio.get('bio')
                    }
                    return pre;
                  }, {}),
                  groups: groups.reduce(function(pre, group) {
                    pre[group.id] = group.get('group_name');
                    return pre;
                  }, {})
                };
                res.json(retObj);
            });
        });
    });
  },

  //NEW VERSION FILTERING

  fetchUserInfo3: function(req, res) {
    var id = req.params.id;
    User
      .where({id: id})
      .fetch({withRelated: ['groups', 'bios', 'userSites']})
      .then(function(user) {
        if (!user) {
          return res.status(404).send('user does not exist!');
        }
        user
          .related('userSites')
          .fetch({withRelated: ['sites']})
          .then(function(userSites) {

            // bios join with bioFields
            user
              .related('bios')
              .fetch({withRelated: ['bioFields']})
              .then(function(bios) {

        // userSites join with sites
                var groups = user.related('groups');
                util.canISeeThisUser({
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
                    permission: user.get('permission'),
                  },
                  sites: userSites.reduce(function(pre, userSite) {
                    var site = userSite.related('sites');
                    pre[site.id] = {
                      site_name: site.get('site_name'),
                      base_url: site.get('base_url'),
                      value: userSite.get('rest_url')
                    };
                    return pre;
                  }, {}),
                  userInfo: bios.reduce(function(pre, bio) {
                    var bioField = bio.related('bioFields');
                    pre[bioField.id] = {
                      title: bioField.get('title'),
                      value: bio.get('bio')
                    }
                    return pre;
                  }, {}),
                  groups: groups.reduce(function(pre, group) {
                    pre[group.id] = group.get('group_name');
                    return pre;
                  }, {}),
                }, req)
                .then(function(returned) {
                  res.json(returned);
                })
                .catch(function(err) {
                  console.log(err);
                  res.json(err);
                });
              });
          });
      });
  },

  // http://localhost:3000/db/users/user/:id
  modifyUser2: function(req, res) {
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
                var groups = user.related('groups');

                user
                  .save({
                    handle: data.user.handle,
                    githubid: data.user.githubid,
                    name: user.get('name'),
                    email: data.user.email,
                    url_hash: data.user.url,
                    permission: data.user.permission === 0 ? 0 : 1,
                    public: data.user.public === 0 ? 0 : 1,
                  })
                  .then(function(user) {
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
