var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var db = require('../server/dbConfig');
var app = require('../server/app');

describe('endpoint checks', function() {
  beforeEach(function() {
  });

  describe('/db/groups', function() {
    describe('GET', function() {
      it('responds with a 200 (OK)', function(done) {
        request(app)
          .get('/db/groups')
          .expect(200, done);
      });
    });

    describe('POST', function() {
      it('responds with a 201 (OK) on a successful entry', function(done) {
        request(app)
          .post('/db/groups')
          .send({group_name: 'testGroup'})
          .expect(201, done);
      });
    });

  });
  describe('db/groups/:id', function() {
    describe('GET', function() {
      it('responds with a 200 (OK)', function(done) {
        done();
      })
    });
  })
});