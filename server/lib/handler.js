var Group = require('../models/group');
var Groups = require('../collections/groups');
var User = require('../models/user');
var Users = require('../collections/users');
var Network = require('../models/network');
var Networks = require('../collections/networks');
var NetworkValue = require('../models/networkValue');
var NetworkValues = require('../collections/networkValues');
var Bio = require('../models/bio');
var Bios = require('../collections/bios');
var BioField = require('../models/bioField');
var BioFields = require('../collections/bioFields');
var bodyParser = require('body-parser');
var util = require('./utility.js');

module.exports = {
  // http://localhost:3000/db/groups/
  fetchGroups: function(req, res) {
    Groups.fetch().then(function(groups) {
      res.json(groups);
    });
  },
  // http://localhost:3000/db/groups/group/:id
  fetchGroupId: function(req, res) {
    var id = req.params.id;
    Group.where({id: id}).fetch({withRelated: ['users']}).then(function(group) {
      if (!group) {
        return res.send(200, 'group has no users!')
      }
      var users = group.related('users').map(function(user) {
        return {
          id: user.id,
          username: user.attributes.username,
          image: user.attributes.image
        };
      });
      res.json({
        group_id: group.id,
        group_name: group.attributes.group_name,
        users: users
      });
    });
  },
  createGroup: function(req, res) {},
  modifyGroup: function(req, res) {},
  deleteGroup: function(req, res) {},




  // http://localhost:3000/db/users
  fetchUsers: function(req, res) {
    Users.fetch({withRelated: ['groups']}).then(function(users) {
      res.json(users.map(function(user) {
        var group = user.related('groups');
        return {
          id: user.id,
          username: user.attributes.username,
          password: user.attributes.password,
          url: user.attributes.url_hash,
          email: user.attributes.email,
          group: group.attributes.group_name
        };
      }));
    });
  },
  // http://localhost:3000/db/users/group/:id
  fetchUsersByGroup: function(req, res) {
    var groupId = req.params.id;
    Users.query('where', 'Group_id', '=', groupId).fetch().then(function(users) {
      res.json(users.map(function(user) {
        return {
          id: user.id,
          username: user.attributes.username,
          password: user.attributes.password,
          url: user.attributes.url_hash,
          email: user.attributes.email
        };
      }));
    });
  },
  // http://localhost:3000/db/users/user/:id
  fetchUserId: function(req, res) {
    var id = req.params.id;
    User.where({id: id}).fetch({withRelated: ['groups', 'bios', 'networkValues']}).then(function(user) {
      if (!user) { 
        return res.send(404, 'user does not exist!'); 
      }
      var group = user.related('groups');
      user.related('networkValues').fetch({withRelated: ['networks']}).then(function(networkValues) {
        var networks = networkValues.map(function(networkValue) {
          var network = networkValue.related('networks');
          return {
            id: network.id,
            name: network.attributes.network_name,
            url: network.attributes.base_url,
            value: networkValue.attributes.rest_url
          };
        });
        user.related('bios').fetch({withRelated: ['bioFields']}).then(function(bios) {
          bios = bios.map(function(bio) {
          var bioField = bio.related('bioFields');
            return {
              id: bioField.id,
              title: bioField.attributes.field,
              value: bio.attributes.bio
            };
          });
          res.json({
            user: {
              id: user.id,
              username: user.attributes.username,
              password: user.attributes.password,
              url: user.attributes.url_hash,
              email: user.attributes.email,
              group: group.attributes.group_name,
              image: user.attributes.image
            },
            networks: networks,
            userInfo: bios
          });
        });
      });
    });
  },
  createUser: function(req, res) {},
  modifyUser: function(req, res) {},
  deleteUser: function(req, res) {},




  // http://localhost:3000/db/sites
  fetchSites: function(req, res) {
    Networks.fetch().then(function(networks) {
      res.json(networks);
    });
  },
  createSite: function(req, res) {},
  modifySite: function(req, res) {},
  deleteSite: function(req, res) {},




  // http://localhost:3000/db/fields
  fetchFields: function(req, res) {
    NetworkValues.fetch().then(function(networkValues) {
      res.json(networkValues);
    });
  },
  createField: function(req, res) {},
  modifyField: function(req, res) {},
  deleteField: function(req, res) {},




  checkLogin: function(req, res) {

    User.where({email: req.body.email}).fetch().then(function(user){
      if(user === null) {
        res.send(401, 'No user with that email');
      } else {
        // bcrypt.compare(password, user[0].password, function(err, isMatch){
        //   if(match) {
        //     res.send(200, util.generateToken(user.id, user));
        //   } else {
        //     // res.send(401, 'Invalid Password');
        //     res.send(200, util.generateToken(user.id, user));

        //   }
        // });
        if(req.body.password === user.attributes.password) {
          res.send(200, JSON.stringify({token: util.generateToken(user.attributes.id, user.attributes.email, user.attributes.permission), perm: user.attributes.permission}));
        } else {
          res.send(403, 'Invalid Password');
        }
      }
    });
  }
};




