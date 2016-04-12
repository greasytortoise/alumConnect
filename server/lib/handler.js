var Group = require('../models/group');
var Groups = require('../collections/groups');
var User = require('../models/user');
var Users = require('../collections/users');
var Network = require('../models/network');
var Networks = require('../collections/networks');
var Bio = require('../models/bio');
var Bios = require('../collections/bios');

module.exports = {
  // sends id and group_name
  // eg) { id: 1, group_name: "HR40" }
  fetchGroups: function(req, res) {
    Groups.fetch()
      .then(function(groups) {
        res.json(groups);
      });
  },

  // sends id, group_name, and array of users
  // eg) { id: 1, group_name: "HR40", users: [...] }
  fetchGroupId: function(req, res) {
    var id = req.params.id;
    Users.query('where', {group_id: id})
      .fetch({withRelated: ['groups']})
      .then(function(users) {
        var usersArray = [];
        users.forEach(function(user) {
          usersArray.push({
            id: user.id,
            username: user.attributes.username,
            image: user.attributes.image
          });
        });
        res.json({
          group_id: users.at(0).related('groups').id,
          group_name: users.at(0).related('groups').attributes.group_name,
          users: usersArray
        });
      })
      .catch(function(err) {
        res.send(404, 'group has no users!');
      });
  },

  postGroup: function(req, res) {
    //todo
  },

  // ignore for now!
  fetchUsers: function(req, res) {
    Users.fetch({withRelated: ['groups']})
      .then(function(users) {
        var retArray = [];
        users.forEach(function(user) {
          retArray.push({
            id: user.id,
            username: user.attributes.username,
            url: user.attributes.url_hash,
            email: user.attributes.email,
            group: user.related('groups').attributes.group_name
          });
        })
        res.json(retArray);
      });
  },

  fetchUserId: function(req, res) {
    var id = req.params.id;
    User.where({id: id}).fetch({withRelated: ['groups', 'bios']})
      .then(function(user) {
        if (!user) { return res.send(404, 'user does not exist!'); }
          res.json({
            user: {
              id: user.id,
              username: user.attributes.username,
              url: user.attributes.url_hash,
              email: user.attributes.email,
            },
            group: {
              group: user.related('groups').attributes.group_name
            },
            bio: {
              name: user.related('bios').attributes.name,
              before_hr: user.related('bios').attributes.before_hr,
              location: user.related('bios').attributes.location,
              interest: user.related('bios').attributes.interest,
              experience: user.related('bios').attributes.experience,
              fun_fact: user.related('bios').attributes.fun_fact
            },
            networks: {
              
            }
        });
      });
  },

  postUser: function(req, res) {
    //todo
  },

  fetchNetworks: function(req, res) {
    Networks.fetch()
      .then(function(networks) {
        var retArray = [];
        networks.forEach(function(network) {
          retArray.push({
            id: network.id,
            url: network.attributes.network_name
          });
        })
        res.json(retArray);
      });
  },

  fetchNetworkId: function(req, res) {
    var id = req.params.id;
    Network.where({id: id}).fetch()
      .then(function(network) {
        if (!network) {
          return res.send(404);
        }
        res.json({
          id: network.id,
          url: network.attributes.network_name
        });
      });
  },

  postNetwork: function(req, res) {
    //todo
  },

  fetchBios: function(req, res) {
    Bios.fetch({withRelated: ['users']})
      .then(function(bios) {
        console.log(bios);
        res.json(bios);
      });
  },

  fetchBioId: function(req, res) {
    var id = req.params.id;
    // withRelated does not work in fetch for some reason!!
    Bio.where({id: id}).fetch()
      .then(function(bio) {
        if (!bio) {
          return res.send(404);
        }
        User.where({id: bio.attributes.user_id}).fetch()
          .then(function(user) {``
            Group.where({id: user.attributes.group_id}).fetch()
              .then(function(group) {
                res.json({
                  bio: bio,
                  user: user,
                  group: group
                });
              })
          });
      });
  },

  postBio: function(req, res) {
    //todo
    Bio.create({
      name: 'robot',
      before_hr: 'sleep all day',
      location: 'planet earth',
      interest: 'sleep',
      experience: 'sleep a lot',
      fun_fact: 'I like to sleep',
      user_id: 5
    })
    .then(function(bio) {
      res.send(201);
    });
  }
};