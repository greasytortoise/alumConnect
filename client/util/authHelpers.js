var RestHandler = require('./RestHandler');

var request = require('superagent');
var Promise = require('bluebird');

module.exports = {

  requireAuth(callback) {

    console.log('!!!!!!!!!!');
    RestHandler.Get('/auth/islogged', function(err, res) {
      console.log(res);
      // if(res.status === 200) {
      //   replace({
      //     pathname: '/login',
      //     state: { nextPathname: nextState.location.pathname }
      //   });
      // }
        callback(err, res);

    });
  }

  

  // getToken() {
  //   //returns the JWT in localstorage
  //   return localStorage.getItem('jwtAlum');
  // },

  // logout() {
  //   //Deletes the token from localstorage
  //   localStorage.removeItem('jwtAlum');

  // },



  // loggedIn() {
  //   //Check if token exists. If it does, check the expiration date, and return boolean representing logged in status
  //   if(localStorage.getItem('jwtAlum')) {
  //     var timeout = JSON.parse(atob(localStorage.getItem('jwtAlum').split('.')[1])).exp;
  //     if(Date.now() >= timeout) {
  //       localStorage.removeItem('jwtAlum');
  //     }
  //   }
  //   return !!localStorage.getItem('jwtAlum');
  // },

  // checkToken(callback) {
  //   //Check user permissions from server.
  //   if(localStorage.getItem('jwtAlum')) {

  //   // request('POST', '/checktoken')
  //   //   .send({token: JSON.parse(localStorage.getItem('jwtAlum')).token})
  //   //   .end(function(err, res){
  //   //     if(err) {
  //   //       console.log(err);
  //   //     } else {
  //   //       console.log(res);
  //   //       callback(res);
  //   //     }

  //   //   });
  //     RestHandler.Post('/checktoken', {}, callback);


  //   }
  // },


  // onChange() {},

  // parseJwt(){
  //   //parses the token to get the juicy data inside.
  //   if(localStorage.getItem('jwtAlum') !== null) {
  //     return JSON.parse(atob(localStorage.getItem('jwtAlum').split('.')[1]));
  //   } else {
  //     return null;
  //   }
  // },

  // parseJwtAsync(callback) {
  //   if(this.parseJwt) {
  //     callback(this.parseJwt());
  //   } else {
  //     callback(undefined);
  //   }
  // }

}
