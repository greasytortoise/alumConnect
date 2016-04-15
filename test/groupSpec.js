var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var Promise = require('bluebird');

var groupController = require('../server/controllers/groupController');
var app = require('../server/app.js');

var Group = require('../server/models/group');
var Groups = require('../server/collections/groups');

var mockIds;
var mockGroupAttrs = [
  {group_name: 'testGroup1'},
  {group_name: 'testGroup2'},
  {group_name: 'testGroup3'},
  {group_name: 'testGroup4'}
];

describe('Group Endpoint: ', function() {
  beforeEach('Re-populates database with test groups', function(done) {
    Promise.map(mockGroupAttrs, function(attr) {
      return Group.forge(attr).fetch();
    })
    .filter(function(groups) {
      return groups;
    })
    .then(function(groups) {
      return Promise.map(groups, function(group) {
        return group.destroy();
      });
    })
    .then(function() {
      return Promise.map(mockGroupAttrs, function(attr) {
        if (attr.group_name !== 'testGroup4') {
          return Group.forge(attr).save();
        }
      });
    })
    .filter(function(groups) {
      return groups
    })
    .then(function(groups) {
      mockIds = groups.map(function(group) {
        return group.id;
      });
      done();
    });
  });

  after('Deletes all test groups', function(done) {
    Promise.map(mockGroupAttrs, function(attr) {
      return Group.forge(attr).fetch();
    })
    .filter(function(groups) {
      return groups;
    })
    .then(function(groups) {
      return Promise.map(groups, function(group) {
        return group.destroy();
      });
    }).then(function() {
      done();
    })
  });

  describe('fetchGroups', function() {
    it('displays all Groups on a successful get request (200)', function(done) {
      request(app)
        .get('/db/groups')
        .expect(200)
        .end(function(err, res) {
          Groups
            .fetch()
            .then(function(groups) {
              expect(groups).to.have.length.above(2);
              expect(groups.findWhere({group_name: 'testGroup1'})).to.exist;
              expect(groups.findWhere({group_name: 'testGroup2'})).to.exist;
              expect(groups.findWhere({group_name: 'testGroup3'})).to.exist;
              expect(groups.findWhere({group_name: 'testGroup4'})).to.not.exist;
              done();
            });
        });
    });
  });

  xdescribe('fetchGroupInfo', function() {
    it('displays all info on a specific group on a successful get request (200)', function(done) {
      done();
    });
  });

  describe('createGroup', function() {
    it('creates a new group on a successful post request (201)', function(done) {
      request(app)
        .post('/db/groups')
        .send(mockGroupAttrs[3]) // group4
        .expect(201)
        .end(function(err, res) {
          expect(res.body.group_name).to.equal(mockGroupAttrs[3].group_name);
          done();
        });
    });

    it('does not create an existing group on a bad post request (400)', function(done) {
      request(app)
        .post('/db/groups')
        .send(mockGroupAttrs[2]) // group3
        .expect(400)
        .end(function(err, res) {
          expect(res.body.group_name).to.not.exist;
          expect(res.text).to.equal('Group already exists!');
          done();
        });
    });
  });

  describe('modifyGroup', function() {
    it('does not modify a group\'s name to an existing group\'s name on a bad post request (400)', function(done) {
      request(app)
        .post('/db/groups/group/' + mockIds[1]) // group2
        .send(mockGroupAttrs[0]) // group1
        .expect(400)
        .end(function(err, res) {
          expect(res.body.group_name).to.not.exist;
          expect(res.text).to.equal('Group name is taken!');
          done();
        });
    });

    it('modifies a group\'s name on a successful post request (201)', function(done) {
      request(app)
        .post('/db/groups/group/' + mockIds[1]) // group2
        .send(mockGroupAttrs[3]) // group4
        .expect(201)
        .end(function(err, res) {
          expect(res.body.group_name).to.equal(mockGroupAttrs[3].group_name);
          done();
        });
    });
  });

});