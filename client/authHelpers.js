var request = require('superagent');
var Promise = require('bluebird');

module.exports = {
  login(email, password) {
    console.log(email);
    console.log(password);

    request('POST', '/login')
      .send({email:email, password:password})
      .end(function(err, res){
        if(err) {
          console.log(err);
        } else {
          console.log(res);
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
