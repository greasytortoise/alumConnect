var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var moment = require('moment');
var User = require('../models/user');
var Group = require('../models/group');
var Groups = require('../collections/groups');
var Group_user = require('../models/group_user');
var Groups_users = require('../collections/groups_users');
var Groups = require('../collections/groups');
var visGroup = require('../models/visibleGroup.js');
var visGroups = require('../collections/visibleGroups.js');
var config = require('../config/githubAPIConfig.js');
var Promise = require('bluebird');
var filter = require('lodash/filter');
var uniq = require('lodash/uniq');

exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.isAdmin = function(req, res, next) {
  
  if (req.isAuthenticated()) {
    User.where({githubid: req.user.attributes.githubid}).fetch()
      .then(function(user) {
        if(user.attributes.permission === 1) {
          next();
        } else {
          res.redirect('/');
        }
      });
  } else {
    res.redirect('/login');
  }
};

exports.filterUsers = function(usersArr, userId) {
  return new Promise(function(resolve, reject) {
    var adminGroups = ['1', '2'];
    var currentUserGroups = [];
    var allowedGroups = [];
    var selectedGroup;
    var filteredUsers = [];

    for (var i = 0; i < usersArr.length; i++) {
      if (userId === usersArr[i].id) {
        for (var group in usersArr[i].groups) {
          if (adminGroups.indexOf(group) !== -1) {
            resolve(usersArr);
          } else {
            selectedGroup = parseInt(group);
          }
        }
      }
    }
    visGroups.models.where({ Group_id: selectedGroup }).fetch()
      .then(function(visGroups) {
        for (var l = 0; l < visGroups.length; l++) {
          allowedGroups.push(visGroups[l].Visible_id);
        }
        for (var j = 0; j < allowedGroups.length; j++) {
          Groups_users.models.where({ Group_id: allowedGroups[j] }).fetch()
            .then(function(gusers) {
              for (var m = 0; m < gusers.length; m++) {
                filteredUsers.push(gusers[m].User_id);
                if (m === gusers.length - 1) {
                  var uniqUsers = uniq(filteredUsers);
                  return filter(usersArr, function(item) {
                    return uniqUsers.indexOf(item.id) !== -1;
                  });
                }
              }
            });
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
















