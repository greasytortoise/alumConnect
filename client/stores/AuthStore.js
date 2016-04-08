import Reflux from 'reflux';
import Actions from '../actions/AuthActions';

var AuthStore = Reflux.createStore({
  listenables: Actions,

  init () {
    this.state = {};
    this.state.jwtAlum = localStorage.getItem('jwtAlum') || null;

    this.state.claims = this.parseJwt();
    this.state.error = false;
    this.state.loading = false;
  },
  
  getInitialState(){
    return this.state;
  },

  getState() {
    return {
      loading: this.state.loading,
      error: this.state.error,
      user: this.userFromClaims(),
      loggedIn: this.loggedIn()

    };
  },

  getInitialState() {
    return this.state;
  },

  userFromClaims(){
    return this.state.claims;
  },

  loggedIn(){
    return this.state.claims !== null;
  },

  changed(){
    this.trigger(this.getState());
  },

  onLogin(email, password){
    this.state.loading = true;
    this.changed();
    
    var hash = CryptoJS.SHA256(password);

/*    MAKE API CALL HERE
    MAKE API CALL HERE
    MAKE API CALL HERE*/

  },

  onLoginCompleted(authResponse) {
    if(authResponse) {
      this.state.jwtAlum = AuthResponse.jwtAlum;
      this.state.claims = this.parseJwt();
      this.state.error = false;

      localStorage.setItem('jwtAlum', this.jwtAlum);
    } else {
      this.state.error = "CANT STUMP THE TRUMP. (Invalid email/pw)";
    }

    this.state.loading = false;
    this.changed();
  },

  onLogout(){
    this.state.jwt = null;
    this.state.claims = null;
    this.state.error = false;
    this.state.loading = false;
    localStorage.removeItem('jwtAlum');
  },

  parseJwt(){
    if(this.state.jwtAlum !== null) {
      return JSON.parse(atob(this.state.jwtAlum.split('.')[1]));
    } else {
      return null;
    }
  }

});

module.exports = AuthStore







