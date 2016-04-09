var Group = require('../models/group');
var Groups = require('../collections/groups');
var User = require('../models/user');
var Users = require('../collections/users');
var Network = require('../models/network');
var Networks = require('../collections/networks');
var Bio = require('../models/bio');
var Bios = require('../collections/bios');

module.exports = {
  fetchGroups: function(req, res) {
    Groups.fetch().then(function(groups) {
      res.json(groups);
    });
  },

  fetchGroupId: function(req, res) {
    var id = req.params.id;
    Group.where({id: id}).fetch().then(function(group) {
      res.json(group);
    });
  },

  postGroup: function(req, res) {
    //todo
  },

  fetchUsers: function(req, res) {
    Users.fetch().then(function(users) {
      res.json(users);
    });
  },

  fetchUserId: function(req, res) {
    var id = req.params.id;
    User.where({id: id}).fetch().then(function(user) {
      res.json(user);
    });
  },

  postUser: function(req, res) {
    //todo
  },

  fetchNetworks: function(req, res) {
    Networks.fetch().then(function(network) {
      res.json(network);
    });
  },

  fetchNetworkId: function(req, res) {
    var id = req.params.id;
    Network.where({id: id}).fetch().then(function(network) {
      res.json(network);
    });
  },

  postNetwork: function(req, res) {
    //todo
  },

  fetchBios: function(req, res) {
    Bios.fetch().then(function(bios) {
      res.json(bios);
    });
  },

  fetchBioId: function(req, res) {
    var id = req.params.id;
    // withRelated does not work in fetch for some reason!!
    Bio.where({id: id}).fetch()
      .then(function(bio) {
        User.where({id: bio.id}).fetch()
          .then(function(user) {
            res.json({
              user: user,
              bio: bio
            });
          });
      });
  },

  postUser: function(req, res) {
    //todo
  }
};