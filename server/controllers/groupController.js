var Group = require('../models/group');
var Groups = require('../collections/groups');

module.exports = {
 // http://localhost:3000/db/groups/
  fetchGroups: function(req, res) {
    Groups
      .fetch()
      .then(function(groups) {
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
    Group
      .where({group_name: data.group_name})
      .fetch()
      .then(function(groupExist) {
        if (groupExist) { 
          return res.status(400).send('Group already exists!'); 
        }
        Groups
          .create({group_name: data.group_name})
          .then(function(newGroup) {
            res.status(201).json(newGroup);
          });
      });
  },
  // http://localhost:3000/db/groups/group/:id
  modifyGroup: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    Group
      .where({group_name: data.group_name})
      .fetch()
      .then(function(group) {
        if (group && (group.id !== parseInt(id))) { 
          return res.send(400, 'Group already exists!'); 
        }
        Group
          .where({id: id})
          .fetch()
          .then(function(group) {
            group
              .save({
                group_name: data.group_name || group.get('group_name')
              })
              .then(function() {
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
};