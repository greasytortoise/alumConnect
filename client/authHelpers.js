var request = require('superagent');
var Promise = require('bluebird');

module.exports = {
  login(email, password) {
    console.log(email);
    console.log(password);

    return request('POST', '/login')
      .send({email:email, password:password})
      .end(function(err, res){
        if(err) {
          console.log(err);
        } else {
          console.log(res);
          localStorage.setItem('jwtAlum', res.text);
          //DO REDIRECT HERE
          return;
        }
      });

  },

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

  onChange() {},

  parseJwt(){
    if(localStorage.getItem('jwtAlum') !== null) {
      return JSON.parse(atob(localStorage.getItem('jwtAlum').split('.')[1]));
    } else {
      return null;
    }
  }


}
