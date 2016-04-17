var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var Promise = require('bluebird');

var handler = require('../server/lib/handler');
var userController = require('../server/controllers/userController');
var app = require('../server/app.js');

var User = require('../server/models/user');
var Users = require('../server/collections/users');

var Group = require('../server/models/group');
var Groups = require('../server/collections/groups');

var UserSite = require('../server/models/userSite');
var UserSites = require('../server/collections/userSites');

var Bio = require('../server/models/bio');
var Bios = require('../server/collections/bios');

// GLUCK WRITING THIS

describe('Site Endpoint: ', function() {
  describe('fetchUsers', function() {

  });

  describe('fetchUsersByGroup', function() {

  });

  describe('fetchUserInfo', function() {

  });

  describe('createUser', function() {

  });

  describe('modifyUser', function() {

  });

  describe('deleteUser', function() {

  });


});


