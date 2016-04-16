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