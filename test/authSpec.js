var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var Promise = require('bluebird');

var handler = require('../server/lib/handler');
var util = require('../server/lib/utility');
var app = require('../server/app.js');

