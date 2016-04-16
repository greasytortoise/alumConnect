var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var Promise = require('bluebird');

var handler = require('../server/lib/handler');
var siteController = require('../server/controllers/siteController');
var app = require('../server/app.js');

var Site = require('../server/models/site');
var Sites = require('../server/collections/sites');

var mockSiteIds;
var mockSiteAttrs = [
  {
    site_name: 'TEST_SITE_0',
    base_url: 'http://www.testsite0.com'
  },
  {
    site_name: 'TEST_SITE_1',
    base_url: 'http://www.testsite1.com'
  },
  {
    site_name: 'TEST_SITE_2',
    base_url: 'http://www.testsite2.com'
  },
  {
    site_name: 'TEST_SITE_3',
    base_url: 'http://www.testsite3.com'
  }
];

describe('Site Endpoint: ', function() {
  before('Set active for each site to 1', function(done) {
    mockSiteAttrs.forEach(function(attr) {
      attr.active = 1;
    });
    done();
  });

  beforeEach('Re-populates database with test sites', function(done) {
    handler.getAll(mockSiteAttrs, Site)
      .then(function(sites) { return handler.deleteAll(sites); })
      .then(function() { return handler.createAll(mockSiteAttrs.slice(0, 3), Site); })
      .then(function(sites) { mockSiteIds = handler.saveIds(sites); })
      .then(function() { done(); });
  });

  after('Deletes all test sites', function(done) {
    handler.getAll(mockSiteAttrs, Site)
      .then(function(site) { return handler.deleteAll(site); })
      .then(function() { done(); });
  });

  describe('fetchSites', function() {
    it('displays all Sites on a successful get request (200)', function(done) {
      request(app)
        .get('/db/sites')
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.have.length.above(2);
          done();
        });
    });
  });

  describe('createSite', function() {
    it('creates a new site on a successful post request (201)', function(done) {
      request(app)
        .post('/db/sites')
        .send(mockSiteAttrs[3]) // site3
        .expect(201)
        .end(function(err, res) {
          expect(res.body.site_name).to.equal(mockSiteAttrs[3].site_name);
          done();
        });
    });

    it('does not create an existing site on a bad post request (400)', function(done) {
      request(app)
        .post('/db/sites')
        .send(mockSiteAttrs[2]) // site2
        .expect(400)
        .end(function(err, res) {
          done();
        });
    });
  });

  describe('modifySite', function() {
    it("does not modify a site's name to an existing site's name on a bad post request (400)", function(done) {
      request(app)
        .post('/db/sites/site/' + mockSiteIds[1]) // site1
        .send(mockSiteAttrs[0]) // site0
        .expect(400)
        .end(function(err, res) {
          expect(res.body.group_name).to.not.exist;
          expect(res.text).to.equal('Site already exists!');
          done();
        });
    });

    it("modifies a site's name on a successful post request (201)", function(done) {
      request(app)
        .post('/db/sites/site/' + mockSiteIds[1]) // site1
        .send(mockSiteAttrs[3]) // site3
        .expect(201)
        .end(function(err, res) {
          expect(res.body.site_name).to.equal(mockSiteAttrs[3].site_name);
          done();
        });
    });

    it('leaves the field as the original text if an empty string is passed in (201)', function(done) {
      request(app)
        .post('/db/sites/site/' + mockSiteIds[1])
        .send({
          site_name: '',
          base_url: ''
        })
        .expect(201)
        .end(function(err, res) {
          expect(res.body.site_name).to.equal(mockSiteAttrs[1].site_name);
          expect(res.body.base_url).to.equal(mockSiteAttrs[1].base_url);
          expect(res.body.active).to.equal(1);
          done();
        })
    });
  });

  describe('deleteSite', function() {
    it('deletes a site on a successful deletion (201)', function(done) {
      request(app)
        .delete('/db/sites/site/' + mockSiteIds[2]) //site2
        .expect(201)
        .end(function(err, res) {
          expect(res.text).to.equal('deleted!');
          done();
        });
    });
  });
});