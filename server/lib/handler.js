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
var bodyParser = require('body-parser');
var util = require('./utility.js');

module.exports = {
  // http://localhost:3000/db/groups/
  // sends id and group_name
  // { id: 1, group_name: "HR40" }
  fetchGroups: function(req, res) {
    Groups.fetch().then(function(groups) {
      res.json(groups);
    });
  },
  // http://localhost:3000/db/groups/:id
  // sends id, group_name, and array of users
  // eg) { id: 1, group_name: "HR40", users: [...] }
  fetchGroupId: function(req, res) {
    var id = req.params.id;
    Group.where({id: id}).fetch({withRelated: ['users']})
      .then(function(group) {
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

  postGroup: function(req, res) {
    //todo
  },

  // ignore for now!
  fetchUsers: function(req, res) {
    Users.fetch({withRelated: ['groups']})
      .then(function(users) {
        var retArray = [];
        users.forEach(function(user) {
          var group = user.related('groups');
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

  // http://localhost:3000/db/users/:id
  // sends a join table on pretty much every table
  /*
    {
      user: {id: 4, username: 'drake', url: ..., email: ...},
      group: {group: "HR40"},
      bio: {...},
      networks: {base_url: ..., rest_url: ...}
    }, 
    ...
  */
  fetchUserId: function(req, res) {
    var id = req.params.id;
    User.where({id: id}).fetch({withRelated: ['groups', 'bios', 'networkValues']})
      .then(function(user) {
        if (!user) { 
          return res.send(404, 'user does not exist!'); 
        }
        var group = user.related('groups');
        var bio = user.related('bios');
        user.related('networkValues').fetch({withRelated: ['networks']})
          .then(function(networkValues) {
            var networks = networkValues.map(function(networkValue) {
              var network = networkValue.related('networks');
              return {
                name: network.attributes.network_name,
                url: network.attributes.base_url,
                value: networkValue.attributes.rest_url
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
              userInfo: [
                {
                  title: 'preferred name',
                  content: bio.attributes.name
                },
                {
                  title: 'what were you doing before HR',
                  content: bio.attributes.before_hr
                },
                {
                  title: 'where did you come from',
                  content: bio.attributes.location
                },
                {
                  title: 'what are your interests',
                  content: bio.attributes.interest
                },
                {
                  title: 'prior experience?',
                  content: bio.attributes.experience
                },
                {
                  title: 'what are some fun facts?',
                  content: bio.attributes.fun_fact
                }
              ]
            });
          });
      });
  },

  postUser: function(req, res) {
    //todo
  },

  // http://localhost:3000/db/networks/
  // sends id and url
  fetchNetworks: function(req, res) {
    Networks.fetch()
      .then(function(networks) {
        res.json(networks);
      });
  },

  // http://localhost:3000/db/networks/1
  // sends id and url
  // may expand upon in the future
  fetchNetworkId: function(req, res) {
    var id = req.params.id;
    Network.where({id: id}).fetch()
      .then(function(network) {
        if (!network) { 
          return res.send(404, 'Network does not exist!'); 
        }
        res.json({
          id: network.id,
          url: network.attributes.base_url, 
          name: network.attributes.network_name,
          active: network.attributes.active
        });
      });
  },

  postNetwork: function(req, res) {
    //todo
  },

  // http://localhost:3000/db/bios
  // sends bio of all users
  fetchBios: function(req, res) {
    Bios.fetch().then(function(bios) {
      res.json(bios);
    });
  },

  // http://localhost:3000/db/bios/1
  // sends bio of id of user sent in
  fetchBioId: function(req, res) {
    var id = req.params.id;
    User.where({id: id}).fetch({withRelated: ['bios']})
      .then(function(user) {
        var bio = user.related('bios');
        console.log('obj is: ', user);
        if (!user) { return res.send(404); }
        res.send(bio);
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
  },

  checkLogin: function(req, res) {

    User.where({email: req.body.email}).fetch().then(function(user){
      if(user.length === 0) {
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
          res.send(200, util.generateToken(user.attributes.id, user.attributes.email, user.attributes.permission));
        } else {
          res.send(403, 'Invalid Password');
        }
      }
    });
  }
};




