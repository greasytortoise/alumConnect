var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var Promise = require('bluebird');

var groupController = require('../server/controllers/groupController');
var app = require('../server/app.js');

var Group = require('../server/models/group');
var Groups = require('../server/collections/groups');
var User = require('../server/models/user');
var Users = require('../server/collections/users');

var mockIds;
var mockGroupAttrs = [
  {group_name: 'DO_NOT_USE_TEST_GROUP_0'},
  {group_name: 'DO_NOT_USE_TEST_GROUP_1'},
  {group_name: 'DO_NOT_USE_TEST_GROUP_2'},
  {group_name: 'DO_NOT_USE_TEST_GROUP_3'}
];

var getAll = function(attrs, Model) {
  return Promise.map(attrs, function(attr) {
    return Model.forge(attr).fetch();
  })
  .filter(function(models) {
    return models;
  });
};

var deleteAll = function(models) {
  return Promise.map(models, function(model) {
    return model.destroy();
  });
};

var createAll = function(attrs, Model) {
  return Promise.map(attrs, function(attr) {
    return Model.forge(attr).save();
  });
};

var saveIds = function(models) {
  return models.map(function(model) {
    return model.id;
  });
}

describe('Group Endpoint: ', function() {
  beforeEach('Re-populates database with test groups', function(done) {
    getAll(mockGroupAttrs, Group)
      .then(function(groups) { return deleteAll(groups); })
      .then(function() { return createAll(mockGroupAttrs.slice(0, 3), Group); })
      .then(function(groups) { mockIds = saveIds(groups); })
      .then(function() { done(); });
  });

  after('Deletes all test groups', function(done) {
    getAll(mockGroupAttrs, Group)
    .then(function(groups) { return deleteAll(groups) })
    .then(function() { done(); })
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
              expect(groups.findWhere(mockGroupAttrs[0]).get('group_name'))
                .to.equal(mockGroupAttrs[0].group_name);
              expect(groups.findWhere(mockGroupAttrs[2]).get('group_name'))
                .to.equal(mockGroupAttrs[2].group_name);
              expect(groups.findWhere(mockGroupAttrs[3])).to.not.exist;
              done();
            });
        });
    });
  });

  xdescribe('fetchGroupInfo', function() {
    // some other day
    before('Populates database with test users', function(done) {
      done();
    });

    after('Deletes test users from database', function(done) {
      done();
    });


    it('displays all info on a specific group on a successful get request (200)', function(done) {
      done();
    });
  });

  describe('createGroup', function() {
    it('creates a new group on a successful post request (201)', function(done) {
      request(app)
        .post('/db/groups')
        .send(mockGroupAttrs[3]) // group3
        .expect(201)
        .end(function(err, res) {
          expect(res.body.group_name).to.equal(mockGroupAttrs[3].group_name);
          done();
        });
    });

    it('does not create an existing group on a bad post request (400)', function(done) {
      request(app)
        .post('/db/groups')
        .send(mockGroupAttrs[2]) // group2
        .expect(400)
        .end(function(err, res) {
          expect(res.body.group_name).to.not.exist;
          expect(res.text).to.equal('Group already exists!');
          done();
        });
    });
  });

  describe('modifyGroup', function() {
    it("does not modify a group's name to an existing group's name on a bad post request (400)", function(done) {
      request(app)
        .post('/db/groups/group/' + mockIds[1]) // group1
        .send(mockGroupAttrs[0]) // group0
        .expect(400)
        .end(function(err, res) {
          expect(res.body.group_name).to.not.exist;
          expect(res.text).to.equal('Group name is taken!');
          done();
        });
    });

    it("modifies a group's name on a successful post request (201)", function(done) {
      request(app)
        .post('/db/groups/group/' + mockIds[1]) // group1
        .send(mockGroupAttrs[3]) // group3
        .expect(201)
        .end(function(err, res) {
          expect(res.body.group_name).to.equal(mockGroupAttrs[3].group_name);
          done();
        });
    });
  });

  describe('deleteGroup', function() {
    it('deletes a group on a succesful deletion (201)', function(done) {
      request(app)
        .delete('/db/groups/group/' + mockIds[2]) //group2
        .expect(201)
        .end(function(err, res) {
          expect(res.text).to.equal('deleted!');
          done();
        });
    });
  });

});