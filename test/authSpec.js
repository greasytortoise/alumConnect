var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var request = require('supertest');
var Promise = require('bluebird');

var handler = require('../server/lib/handler');
var util = require('../server/lib/utility');
var app = require('../server/app.js');

describe('Server utility: ', function() {

  it('generates a token when invoked', function(done) {
    var token = util.generateToken(1, 'sda@gm.com', 1, 'Cool Dude');
    assert.isObject(token);
    done();
  });
  it('verifies token is valid upon request(user logged in)', function(done) {
    var token = util.generateToken(1, 'sda@gm.com', 1, 'Cool Dude');
    request(app)
      .post('/test')
      .send({token: token.token})
      .expect(200)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          done();
        }
      });
  });
    ('Admin', 'admin', 'admin@admin.com', '/assets/trump.jpg', 'ndas2q', 0, 1, 1),

  it('verifies user is admin before accessing protected resources', function(done) {
    var token = util.generateToken(5, 'admin@admin.com', 1, 'Admin');
    request(app)
      .post('/admintest')
      .send({token: token.token})
      .expect(200)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          done();
        }
      });
  });

});