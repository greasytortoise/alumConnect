var request = require('superagent');

module.exports = {
  login(email, password) {

/*    MAKE API CALL HERE
    MAKE API CALL HERE
    MAKE API CALL HERE*/
    // $.ajax({
    //   url: '127.0.0.1:3000/login', 
    //   type: 'POST',
    //   data: JSON.stringify({email:email, password:password}),
    //   success: function(data) {
    //     console.log(data);
    // //localStorage.setItem('jwtAlum', jwtAlum);       

    //   },
    //   error: function (data) {
    //     console.error('Error fetching data');
    //   }
    // });
    request
      .post('127.0.0.1:3000/login')
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
 