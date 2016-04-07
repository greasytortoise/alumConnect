import React from 'react';
import Reflux from 'reflux';

import AuthStore from 'stores/AuthStore';

Class LoginRequired extends React.Component {
  constructor(props) {
    super(props);
  }
  
  this.statics = {
    willTransitionTo(transition, params, query, callback) {
      if(!AuthStore.loggedIn()) {
        transition.redirect('/login', null, {redirect: transition.path});
      }
      callback();
    }
  }

  render() {

    return (
      <Router.RouteHandler/>
    );
  }




};


// window.LoginRequired = LoginRequired;
module.exports = {LoginRequired};