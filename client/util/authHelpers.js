var request = require('superagent');
var Promise = require('bluebird');

module.exports = {


  getToken() {
    return localStorage.getItem('jwtAlum');
  },

  logout() {
    localStorage.removeItem('jwtAlum');
    
    //redirect home
  },

  

  loggedIn() {
    if(localStorage.getItem('jwtAlum')) {
      var timeout = JSON.parse(atob(localStorage.getItem('jwtAlum').split('.')[1])).exp;
      if(Date.now() >= timeout) {
        localStorage.removeItem('jwtAlum');
      }
    }
    return !!localStorage.getItem('jwtAlum');
  },

  checkToken(callback) {
    if(localStorage.getItem('jwtAlum')) {

    request('POST', '/checktoken')
      .send({token: JSON.parse(localStorage.getItem('jwtAlum')).token})
      .end(function(err, res){
        if(err) {
          console.log(err);
        } else {
          console.log(res);
          callback(res);
        }
        
      });
    } 
  },


  onChange() {},

  parseJwt(){
    if(localStorage.getItem('jwtAlum') !== null) {
      return JSON.parse(atob(localStorage.getItem('jwtAlum').split('.')[1]));
    } else {
      return null;
    }
  }


}
