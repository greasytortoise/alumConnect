import React from 'react';
import {Router, Link} from 'react-router';
import auth from '../authHelpers.js';

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

  redirectSwitch() {
    //ADMIN VS USER LOGIN REDIRECT
    console.log('switch hit');
    //if no token, failed login, set error true
    if(!auth.getToken()){
      this.setState({ error: true });

    } else {
      var token = auth.parseJwt();
      console.log(token);
      //else redirect based on permissions
      // if(token.perm === 1) {
      //   window.location.href = '/dashboard'
      // } else {
      //   window.location.href = '/users'
      // }
    }

  },

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.refs);
    const email = this.refs.email.refs.input.value;
    const pass = this.refs.password.refs.input.value;
    auth.login(email, pass);
    this.redirectSwitch();
  },

  render() {
    return (
      <div id='loginFormWrapper'>
        <form id='loginForm' onSubmit={this.handleSubmit}>
          <h2>Please login</h2>
          <Input
            bsSize='large'
            type="email"
            ref="email"
            placeholder='email'
            groupClassName='login-name'
            onChange={this.handleChange} />
          <Input
            bsSize='large'
            type="pass"
            ref="password"
            placeholder='password'
            groupClassName='login-password'
            onChange={this.handleChange} />
          <ButtonInput bsStyle="primary" bsSize="large" type="submit" block>Login</ButtonInput>
          {this.state.error && (
            <p>HANDS TOO SMALL!</p>
          )}
        </form>


      </div>
    );
  }
})




module.exports = Login;
