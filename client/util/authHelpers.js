import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'

var request = require('superagent');
var Promise = require('bluebird');
var RestHandler = require('./RestHandler.js');
module.exports = {

  requireAuth(nextState, replace) {
    //check cookie 'ac' value to assertain user permissions. If inadequete, redirect to login
    var temp = module.exports.getCookie('ac');
    if (!temp || (temp !== '1' && temp !== '0')){
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  },

  requireAdmin(nextState, replace){
    //check cookie 'ac' value to assertain user permissions. If inadequete, redirect to login
    var temp = module.exports.getCookie('ac');
    if (!temp || temp !== '1') {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });

    }
  },

  getCookie(name) {
    //cookie reader. OM NOM NOM. 
    var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
    var result = regexp.exec(document.cookie);
    return (result === null) ? null : result[1];
  }
};



