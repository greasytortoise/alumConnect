var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var request = require('supertest');
var Promise = require('bluebird');
var auth = require('../client/util/authHelpers.js');
var handler = require('../server/lib/handler');
var util = require('../server/lib/utility');
var app = require('../server/app.js');
var base64 = require('base64-min');

app.post('/test', util.isLoggedIn, function(req, res) {
  res.send(200);
});
app.post('/admintest', util.isAdmin, function(req, res) {
  res.send(200);
});

// mocha -r mock-local-storage
// must include mock-local-storage or tests wont work

describe('Server utility: ', function() {

  it('token exists', function(done) {
    var token = util.generateToken(5, 'admin@admin.com', 1, 'Admin');
    assert.isObject(token);
    done();
  });
  it('verifies token is valid upon request(user logged in)', function(done) {
    var token = util.generateToken(5, 'admin@admin.com', 1, 'Admin');
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

  it('Gets user permissions from server', function(done) {
    var token = util.generateToken(5, 'admin@admin.com', 1, 'Admin');
    request(app)
      .post('/checktoken')
      .send({token: token.token})
      .expect(200)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          expect(parseInt(res.text)).to.equal(1);
          done();
        }
      });
  });

});

describe('Client authentication: ', function() {
  beforeEach('create new token', function(done) {
    localStorage.setItem('jwtAlum', JSON.stringify(util.generateToken(5, 'admin@admin.com', 1, 'Admin')));
    done();
  });

  after('destroy token in localStorage', function(done) {
    localStorage.clear();
    done();
  });

  it('localStorage has a token', function(done) {
    expect(localStorage.getItem('jwtAlum')).to.not.be.undefined;
    done();
  });

  it('token gets parsed', function(done) {
    //auth.parseJwt doesn't work due to not having window.atob(), so base64 is used to simulate the function 
    var decoded = base64.decode(localStorage.getItem('jwtAlum').split('.')[1]);
    decoded = decoded.substring(0, decoded.length - 1);
    var parsed = JSON.parse(decoded);
    expect(parsed.iss).to.equal(5);
    done();

  });

  it('Destroys the token on logout', function(done) {
    auth.logout();
    expect(localStorage.getItem('jwtAlum')).to.be.null;
    done();
  });

  it('Verifies token to check if user is logged in', function(done) {
    expect(!!localStorage.getItem('jwtAlum')).to.equal(true);
    done();
  });


  
});


