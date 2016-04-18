var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var Promise = require('bluebird');

var auth = require('../client/util/authHelpers.js');
var handler = require('../server/lib/handler');
var util = require('../server/lib/utility');

var bioFieldController = require('../server/controllers/fieldController');
var app = require('../server/app.js');

var Field = require('../server/models/bioField');
var Fields = require('../server/collections/bioFields');

var token = util.generateToken(5, 'admin@admin.com', 1, 'Admin');

var mockFieldIds;
var mockFieldAttrs = [
  {
    title: 'test field 0'
  },
  {
    title: 'test field 1'
  },
  {
    title: 'test field 2'
  },
  {
    title: 'test field 3'
  }
];

describe('BioField Endpoint: ', function() {
  beforeEach('Re-populates database with test bioFields', function(done) {
    handler.getAll(mockFieldAttrs, Field)
      .then(function(fields) { return handler.deleteAll(fields); })
      .then(function() { return handler.createAll(mockFieldAttrs.slice(0, 3), Field); })
      .then(function(fields) { mockFieldIds = handler.saveIds(fields); })
      .then(function() { done(); });
  });

  after('Deletes all test bioFields', function(done) {
    handler.getAll(mockFieldAttrs, Field)
      .then(function(field) { return handler.deleteAll(field); })
      .then(function() { done(); });
  });

  describe('fetchFields', function() {
    it('displays all Sites on a successful get request (200)', function(done) {
      request(app)
        .get('/db/fields')
        .expect(200)
        .end(function(err, res) {
          done();
        });
    });
  });

  describe('createField', function() {
    it('creates a new field on a successful post request (201)', function(done) {
      request(app)
        .post('/db/fields')
        .set('x-access-token', token.token)
        .send(mockFieldAttrs[3]) // field3
        .expect(201)
        .end(function(err, res) {
          expect(res.body.title).to.equal(mockFieldAttrs[3].title);
          done();
        });
    });
  });

  describe('modifyField', function() {
    it("modifies a field's name on a successful post request (201)", function(done) {
      request(app)
        .post('/db/fields/field/' + mockFieldIds[1]) // field1
        .set('x-access-token', token.token)
        .send(mockFieldAttrs[3]) // field3
        .expect(201)
        .end(function(err, res) {
          expect(res.body.title).to.equal(mockFieldAttrs[3].title);
          done();
        });
    });

    it('leaves the field as the original text if an empty string is passed in (201)', function(done) {
      request(app)
        .post('/db/fields/field/' + mockFieldIds[1])
        .set('x-access-token', token.token)
        .send({title: '',})
        .expect(201)
        .end(function(err, res) {
          expect(res.body.title).to.equal(mockFieldAttrs[1].title);
          done();
        })
    });
  });


  describe('deleteField', function() {
    it('deletes a field on a successful deletion (201)', function(done) {
      request(app)
        .delete('/db/fields/field/' + mockFieldIds[2]) //field2
        .set('x-access-token', token.token)
        .expect(201)
        .end(function(err, res) {
          expect(res.text).to.equal('deleted!');
          done();
        });
    });
  });


});
