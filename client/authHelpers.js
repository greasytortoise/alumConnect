var request = require('superagent');

module.exports = {
  login(email, password) {

    request('POST', '/login')
      .send(JSON.stringify({email:email, password:password}))
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
 