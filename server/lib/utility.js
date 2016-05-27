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
var request = require('superagent');
// IDs of admin priveledged groups
var adminGroups = ['1', '2'];


exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.isAdmin = function(req, res, next) {
  
  if (req.isAuthenticated()) {
    User.where({ handle: req.user.handle }).fetch()
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

exports.canISeeThisUser = function(userObj, req) {
  
  return new Promise(function(resolve, reject) {
    var mygroups = [];
    var selectedGroup;
    var targetGroup;
    
    for (var group in req.user.groups) {
      if (adminGroups.indexOf(group) !== -1) {
        resolve(userObj);
      } else {
        selectedGroup = group;
      }
    }

    for (var group in userObj.groups) {
      console.log('2', group)
      if (adminGroups.indexOf(group) !== -1 && userObj.user.public === 1) {
        resolve(userObj);
      } else {
        targetGroup = group;
      }
    }
    
    visGroup.where({ Group_id: selectedGroup, Visible_id: targetGroup }).fetch()
      .then(function(results) {
        if (results) {
          resolve(userObj);
        } else {
          resolve('Permission Denied');
        }
      });
  });
};

exports.filterUsers = function(usersArr, userId) {
  return new Promise(function(resolve, reject) {
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
        break;
      }
    }

    visGroups.model.where({ Group_id: selectedGroup }).fetchAll()
      .then(function(visGroups) {
        for (var l = 0; l < visGroups.models.length; l++) {
          allowedGroups.push(visGroups.models[l].attributes.Visible_id);
        }
        var filtered = filter(usersArr, function(item) {
          for (var group in item.groups) {
            if (adminGroups.indexOf(group) !== -1) {
              return true;
            } else if (allowedGroups.indexOf(parseInt(group)) !== -1) {
              return true;
            } else {
              return false;
            }
          }
        });
        resolve(filtered);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

exports.canISeeThisGroup = function(groupObj, req) {
  return new Promise(function(resolve, reject) {
    var mygroups = [];
    var selectedGroup;
    var targetGroup = req.params.id;
  
    if (adminGroups.indexOf(targetGroup.toString()) !== -1) {
      resolve(groupObj);
    }

    for (var group in req.user.groups) {
      if (adminGroups.indexOf(group) !== -1) {
        resolve(groupObj);
      } else {
        selectedGroup = group;
      }
    }

    visGroup.where({ Group_id: selectedGroup, Visible_id: targetGroup }).fetch()
      .then(function(results) {
        console.log(results);
        if (results !== null) {
          resolve(groupObj);
        } else {
          resolve('Permission Denied');
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
};


exports.filterGroups = function(groupsArr, user) {
  return new Promise(function(resolve, reject) {
    var allowedGroups = [];
    var selectedGroup;
    var filteredUsers = [];

    for (var group in user.groups) {
      if (adminGroups.indexOf(group) !== -1) {
        resolve(groupsArr);
      } else {
        selectedGroup = group;
      }
    }
    visGroups.model.where({ Group_id: selectedGroup }).fetchAll()
      .then(function(visGroups) {
        for (var l = 0; l < visGroups.models.length; l++) {
          allowedGroups.push(visGroups.models[l].attributes.Visible_id);
        }
        var filtered = filter(groupsArr, function(item) {
          return allowedGroups.indexOf(item.id) !== -1;
        });
        resolve(filtered);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

