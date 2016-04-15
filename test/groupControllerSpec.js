var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var groupController = require('../server/controllers/groupController');
var app = require('../server/app.js');

var Group = require('../server/models/group');
var Groups = require('../server/collections/groups');

var mockIds = {};
var mockGroups = {
  group1: {
    group_name: 'aTestGroup1',

  },
  group2: {
    group_name: 'aTestGroup2'
  }
};

// I'M GOING TO REDO THIS.... REALIZE UNIT TESTING IS IMPORTANT!

/*
  test is setup to 
  - insert group1

  1) display group1
  2) insert group2
  3) attempt to insert group2 again (fail)
  4) attempts to modify group1 to group2's group_name (fail)
  5) modify group1
*/

describe('Group Endpoint: ', function() {

  // removing aTestGroup1 from database if it exist
  before(function(done) {
    Group
      .where({group_name: mockGroups.group1.group_name})
      .fetch()
      .then(function(group) {
        if (group) { group.destroy().done(); }
        done();
      })
  });

  // removing aTestGroup2 from database if it exist
  before(function(done) {
    Group
      .where({group_name: mockGroups.group2.group_name})
      .fetch()
      .then(function(group) {
        if (group) { group.destroy().done(); }
        done();
      })
  });

  // adding aTestGroup1 to database
  before(function(done) {
    Groups
      .create({group_name: mockGroups.group1.group_name})
      .then(function(newGroup) {
        mockIds.group1 = newGroup.id;
        done();
      })
  });

  xdescribe('fetchGroupInfo', function() {
    it('displays all all info on a specific group', function(done) {
      done();
    })
  });

  describe('createGroup', function() {
    it('creates a new group on a successful post request (201)', function(done) {
      request(app)
        .post('/db/groups')
        .send(mockGroups.group2)
        .expect(201, done);
    });

    it('does not create an existing group on a post request (400)', function(done) {
      request(app)
        .post('/db/groups')
        .send(mockGroups.group2)
        .expect(400, done);
    });
  });

  describe('modifyGroup', function() {
    it('does not modify a group to an existing group on a post request (400)', function(done) {
      console.log(mockIds.group1);
      request(app)
        .post('/db/groups/group/' + mockIds.group1)
        .send(mockGroups.group2)
        .expect(400, done);
    });
  });

  describe('fetchGroups', function() {
    it('displays all Groups on a get request (200)', function(done) {
      request(app)
        .get('/db/groups')
        .end(function(err, res) {
          Group
          .where({group_name: mockGroups.group1.group_name})
          .fetch()
          .then(function(group) {
            expect(group).to.exist;
            done();
          });
        });
    });
  });


});