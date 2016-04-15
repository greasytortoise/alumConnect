var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var groupController = require('../server/controllers/groupController');
var app = require('../server/app.js');
var Group = require('../server/models/group');
var Groups = require('../server/collections/groups');

var IDs = {};

describe('**TEST FOR /db/groups ENDPOINT**', function() {
  before(function(done) {
    Group
      .where({group_name: 'aTestGroup'})
      .fetch()
      .then(function(group) {
        if (group) {
          IDs.aTestGroup = group.id;
          return done(); 
        }
        Groups
          .create({group_name: 'aTestGroup'})
          .then(function() {
            IDs.aTestGroup = group.id;
            done();
          });
      });    
  });

  describe('/db/groups', function() {
    it('creates a new group on a successful post request', function(done) {
      request(app)
        .post('/db/groups')
        .send({group_name: 'aTestGroup2'})
        .expect(201)
        .end(function(err, res) {
          done();
        });
    });
  });

  describe('fetchGroups should display all Groups', function() {
    it('Displays all Groups', function(done) {
      request(app)
        .get('/db/groups')
        .end(function(err, res) {
          Group
          .where({group_name: 'aTestGroup'})
          .fetch()
          .then(function(group) {
            expect(group).to.exist;
            done();
          });
        });
    });
  });


});