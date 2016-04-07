import Reflux from 'reflux';
import Actions from '../actions/AuthActions';

var AuthStore = Reflux.createStore({
  listenables: Actions,

  init () {
    this.jwtAlum = localStorage.getItem('jwtAlum');

    this.claims = this.parseJwt();
    this.error = false;
    this.loading = false;
  },

  getState() {
    return {
      loading: this.loading,
      error: this.error,
      user: this.userFromClaims(),
      loggedIn: this.loggedIn()

    };
  },

  userFromClaims(){
    return this.claims;
  },

  loggedIn(){
    return this.claims !== null;
  },

  changed(){
    this.trigger(this.getState());
  },

  onLogin(email, password){
    this.loading = true;
    this.changed();
    
    var hash = CryptoJS.SHA256(password);

/*    MAKE API CALL HERE
    MAKE API CALL HERE
    MAKE API CALL HERE*/

  },

  onLoginCompleted(authResponse) {
    if(authResponse) {
      this.jwtAlum = AuthResponse.jwtAlum;
      this.claims = this.parseJwt();
      this.error = false;

      localStorage.setItem('jwtAlum', this.jwtAlum);
    } else {
      this.error = "CANT STUMP THE TRUMP. (Invalid email/pw)";
    }

    this.loading = false;
    this.changed();
  },

  onLogout(){
    this.jwt = null;
    this.claims = null;
    this.error = false;
    this.loading = false;
    localStorage.removeItem('jwtAlum');
  },

  parseJwt(){
    if(this.jwtAlum !== null) {
      return JSON.parse(atob(this.jwtAlum.split('.')[1]));
    } else {
      return null;
    }
  }

});

module.exports = AuthStore







