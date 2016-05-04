import React from 'react';
import {Router, Link} from 'react-router';
import auth from '../util/authHelpers.js';
import request from 'superagent';
import RestHandler from '../util/RestHandler.js';

import { Grid, Input, ButtonInput } from 'react-bootstrap';

var Promise = require('bluebird');


const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    document.body.classList.add('page-login');
  },
  componentWillUnmount(){
    document.body.classList.remove('page-login');
  },
  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault();

    window.location.href = '/auth';

  },

  render() {
    return (
      <div id='loginFormWrapper'>
        <form id='loginForm' onSubmit={this.handleSubmit}>
          <img className="image" src='../assets/logo.png' />

          <h3>Student Network</h3>
          <ButtonInput bsStyle="primary" bsSize="large" type="submit" block>Log in with Github</ButtonInput>

        </form>


      </div>
    );
  }
})




module.exports = Login;
