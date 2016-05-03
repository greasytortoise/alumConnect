var RestHandler = require('./RestHandler');

var request = require('superagent');
var Promise = require('bluebird');

module.exports = {

  redirectSwitch() {
    var temp = getCookie('ac');

    if(!temp) {
      window.location.href = '/login';
    } else if (temp === '8609213322' ) {
      window.location.href = '/dashboard';
    } else if (temp === '2319028362') {
      window.location.href = '/';
    }
    
  },

  requireAuth(nextState, replace) {
    var temp = getCookie('ac');

    if (!temp || (temp !== '2319028362' && temp !== '8609213322')){
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  },

  requireAdmin(nextState, replace){
    var temp = getCookie('ac');

    if (!temp || temp !== '8609213322') {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  },

  logout() {
    document.cookie = 'ac' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/login';
  }
}

var getCookie = function(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}
