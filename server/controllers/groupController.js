var db = require('../dbConfig');
var Group = require('../models/group');
var Groups = require('../collections/groups');
var VisibleGroup = require('../models/visibleGroup');
var VisibleGroups = require('../collections/visibleGroups');
var util = require('../lib/utility.js');
var Promise = require('bluebird');

module.exports = {
 // http://localhost:3000/db/groups/
  fetchGroups: function(req, res) {
    Groups
      .fetch({withRelated: ['visibleGroups']})
      .then(function(groups) {
        res.json(groups.map(function(group) {
          var visibleGroups = group.related('visibleGroups');
          return {
            id: group.id,
            group_name: group.get('group_name'),
            visibleGroups: visibleGroups.reduce(function(prev, visibleGroup) {
              var visible_id = visibleGroup.get('Visible_id');
              prev[visible_id] = groups.get(visible_id).get('group_name');
              return prev;
            }, {})
          };
        }));
      })
  },

  //FOR FILTERING
  
  // fetchGroups2: function(req, res) {
  //   Groups
  //     .fetch({withRelated: ['visibleGroups']})
  //     .then(function(groups) {
  //       util.filterGroups(groups.map(function(group) {
  //         var visibleGroups = group.related('visibleGroups');
  //         return {
  //           id: group.id,
  //           group_name: group.get('group_name'),
  //           visibleGroups: visibleGroups.reduce(function(prev, visibleGroup) {
  //             var visible_id = visibleGroup.get('Visible_id');
  //             prev[visible_id] = groups.get(visible_id).get('group_name');
  //             return prev;
  //           }, {})
  //         };
  //       }), req.user.attributes.id)
  //       .then((filtered) => {
  //         res.json(filtered);
  //       })
  //     })
  // },
  // http://localhost:3000/db/groups/group/:id
  fetchGroupInfo: function(req, res) {
    var id = req.params.id;
    Group
      .where({id: id})
      .fetch({withRelated: ['users', 'visibleGroups']})
      .then(function(group) {
        if (!group) {
          return res.status(404).send('There is no such group!');
        }
        var users = group.related('users');
        var visibleGroups = group.related('visibleGroups');
        var retObj = {
          group_id: group.id,
          group_name: group.get('group_name'),
          users: users.map(function(user) {
            return {
              id: user.id,
              name: user.get('name'),
              image: user.get('image')
            };
          }),
          visibleGroups: visibleGroups.reduce(function(prev, visibleGroup) {
            var visible_id = visibleGroup.get('Visible_id');
            prev[visible_id] = group.get('group_name');
            return prev;
          }, {})
        }
        res.json(retObj);
    });
  },
  // http://localhost:3000/db/groups
  createGroup: function(req, res) {
    var data = req.body;

    // hack since for now the object is null!
    data.visibleGroups = data.visibleGroups || [];

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
            return Promise.each(data.visibleGroups, function(groupId) {
              return VisibleGroups.create({
                Group_id: newGroup.id,
                Visible_id: groupId
              });
            });
          })
          .then(function() {
            res.status(201).json('group is created!');
          });
      });
  },
  // http://localhost:3000/db/groups/group/:id
  modifyGroup: function(req, res) {
    var id = req.params.id;
    var data = req.body;

    // hack since for now the object is null!
    data.visibleGroups = data.visibleGroups || [];

    Group
      .where({group_name: data.group_name})
      .fetch()
      .then(function(group) {
        if (group && (group.id !== parseInt(id))) {
          return res.status(400).send('Group name is taken!');
        }
        Group
          .where({id: id})
          .fetch({withRelated: ['visibleGroups']})
          .then(function(group) {
            var visibleGroups = group.related('visibleGroups');
            group
              .save({
                // maybe get rid of 'OR'
                group_name: data.group_name || group.get('group_name')
              })
              .then(function() {
                return Promise.each(visibleGroups.models, function(visibleGroup) {
                  return db.knex('Visible_Groups')
                    .where({
                      Group_id: id
                    })
                    .del();
                });
              })
              .then(function() {
                return Promise.each(data.visibleGroups, function(visibleGroup) {
                  VisibleGroups.create({
                    Group_id: id,
                    Visible_id: visibleGroup
                  });
                });
              })
              .then(function() {
                res.status(201).send(group);
              });
        });
    });
  },
  // http://localhost:3000/db/groups/group/:id
  deleteGroup: function(req, res) {
    var id = req.params.id;
    Group
      .where({id: id})
      .destroy()
      .then(function() {
        res.status(201).send('deleted!');
      });
  },
};
