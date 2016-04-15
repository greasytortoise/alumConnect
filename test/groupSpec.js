var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var promise = require('bluebird');

var groupController = require('../server/controllers/groupController');
var app = require('../server/app.js');

var Group = require('../server/models/group');
var Groups = require('../server/collections/groups');

var mockIds = {};
var mockGroups = {
  group1: {
    group_name: 'testGroup1',

  },
  group2: {
    group_name: 'testGroup2'
  },
  group3: {
    group_name: 'testGroup3'
  }
};

// I just want to delete a group if it exists
describe('Group Endpoint: ', function() {
  beforeEach(function(done) {
    promise.all([
      new Group(mockGroups.group1).fetch(),
      new Group(mockGroups.group2).fetch(),
      new Group(mockGroups.group3).fetch()
    ])
    .then(function(groups) {
      groups.forEach(function(group) {
        if (group) {
          console.log(group);
          setTimeout(group.destroy, 100);
        }
      });
    })
    .then(function() {
      done();
    });
  });

  describe('atest', function() {
    it('btest', function(done) {
      done();
    });
  });
});