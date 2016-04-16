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
    it('', function(done) {
      done();
    });
  });

  describe('createSite', function() {
    it('', function(done) {
      done();
    });
  });

  describe('modifySite', function() {
    it('', function(done) {
      done();
    });
  });

  describe('deleteSite', function() {
    it('', function(done) {
      done();
    });
  });
});