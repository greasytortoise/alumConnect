var Group = require('../models/group');
var Groups = require('../collections/groups');
var User = require('../models/user');
var Users = require('../collections/users');
var Site = require('../models/site');
var Sites = require('../collections/sites');
var UserSite = require('../models/userSite');
var UserSites = require('../collections/userSites');
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
  fetchGroupInfo: function(req, res) {
    var id = req.params.id;
    Group.where({id: id}).fetch({withRelated: ['users']}).then(function(group) {
      if (!group) { return res.send(200, 'group has no users!'); }
      var users = group.related('users');
      res.json(200, {
        group_id: group.id,
        group_name: group.get('group_name'),
        users: users.map(function(user) {
          return {
            id: user.id,
            username: user.get('username'),
            image: user.get('image')
          };
        })
      });
    });
  },
  // http://localhost:3000/db/groups
  createGroup: function(req, res) {
    var data = req.body;
    Group.where({group_name: data.group_name}).fetch().then(function(groupExist) {
      if (groupExist) { return res.send(400, 'Group already exists!'); }
      Groups.create({group_name: data.group_name}).then(function(newGroup) {
        res.json(201, newGroup);
      });
    });
  },
  // http://localhost:3000/db/groups/group/:id
  modifyGroup: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    Group.where({group_name: data.group_name}).fetch().then(function(groupExist) {
      if (groupExist && (groupExist.id !== parseInt(id))) { 
        return res.send(400, 'Group already exists!'); 
      }
      Group.where({id: id}).fetch().then(function(group) {
        group.save({
          group_name: data.group_name || group.get('group_name')
        }).then(function() {
          res.json(201, group);
        });
      });
    });
  },
  // http://localhost:3000/db/groups/group/:id
  deleteGroup: function(req, res) {
    var id = req.params.id;
    Group.where({id: id}).destroy().then(function() {
      res.send(201, 'deleted!');
    });
  },




  // http://localhost:3000/db/users
  fetchUsers: function(req, res) {
    Users.fetch({withRelated: ['groups']}).then(function(users) {
      res.json(200, users.map(function(user) {
        var group = user.related('groups');
        return {
          id: user.id,
          username: user.get('username'),
          password: user.get('password'),
          url: user.get('url_hash'),
          email: user.get('email'),
          group: group.get('group_name')
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
          username: user.get('username'),
          password: user.get('password'),
          url: user.get('url_hash'),
          email: user.get('email')
        };
      }));
    });
  },
  // http://localhost:3000/db/users/user/:id
  fetchUserInfo: function(req, res) {
    var id = req.params.id;
    User.where({id: id}).fetch({withRelated: ['groups', 'bios', 'userSites']}).then(function(user) {
      if (!user) { 
        return res.send(404, 'user does not exist!'); 
      }
      var group = user.related('groups');
      user.related('userSites').fetch({withRelated: ['sites']}).then(function(userSites) {
        var sites = userSites.map(function(userSite) {
          var site = userSite.related('sites');
          return {
            id: site.id,
            name: site.get('site_name'),
            url: site.get('base_url'),
            value: userSite.get('rest_url')
          };
        });
        user.related('bios').fetch({withRelated: ['bioFields']}).then(function(bios) {
          bios = bios.map(function(bio) {
          var bioField = bio.related('bioFields');
            return {
              id: bioField.id,
              title: bioField.get('field'),
              value: bio.get('bio')
            };
          });
          res.json({
            user: {
              id: user.id,
              username: user.get('username'),
              password: user.get('password'),
              url: user.get('url_hash'),
              email: user.get('email'),
              group: group.get('group_name'),
              image: user.get('image')
            },
            sites: sites,
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
    Sites.fetch().then(function(sites) {
      res.json(200, sites);
    });
  },
  // http://localhost:3000/db/sites
  createSite: function(req, res) {
    var data = req.body;
    Site.where({site_name: data.site_name}).fetch().then(function(siteExist) {
      if (siteExist) { return res.send(400, 'Site already exists'); }
      Sites.create({
        site_name: data.site_name,
        base_url: data.base_url,
        active: 1
      }).then(function(newSite) {
        res.json(201, newSite);
      });

    });
  },
  // http://localhost:3000/db/sites/site/:id
  modifySite: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    Site.where({site_name: data.site_name}).fetch().then(function(siteExist) {
      if (siteExist && (siteExist.id !== parseInt(id))) {
        return res.send(400, 'Site already exists!'); 
      }
      Site.where({id: id}).fetch().then(function(site) {
        site.save({
          site_name: data.site_name || site.get('site_name'),
          base_url: data.base_url || site.get('base_url'),
          active: data.active || site.get('active')
        }).then(function() {
          res.json(201, site);
        });
      });
    });    
  },
  // http://localhost:3000/db/sites/site/:id
  deleteSite: function(req, res) {
    var id = req.params.id;
    Site.where({id: id}).destroy().then(function() {
      res.send(201, 'deleted!');
    });
  },




  // http://localhost:3000/db/fields
  fetchFields: function(req, res) {
    BioFields.fetch().then(function(userSites) {
      res.json(200, userSites);
    });
  },
  // http://localhost:3000/db/fields
  createField: function(req, res) {
    var data = req.body;
    BioFields.create({
      field: data.field
    }).then(function(newBioField) {
      res.json(201, newBioField);
    });
  },
  // http://localhost:3000/db/fields/field/:id  
  modifyField: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    BioField.where({id: id}).fetch().then(function(bioField) {
      bioField.save({
        field: data.field || bioField.get('field')
      }).then(function() {
        res.json(201, bioField);
      });
    });
  },
  // http://localhost:3000/db/fields/field/:id 
  deleteField: function(req, res) {
    var id = req.params.id;
    BioField.where({id: id}).destroy().then(function() {
      res.send(201, 'deleted!');
    });  
  },




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




