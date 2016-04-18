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
    const email = this.refs.email.refs.input.value;
    const pass = this.refs.password.refs.input.value;
    var loginComponent = this;
    RestHandler.Post('/login', {email: email, password: pass}, function(err, res) {
      console.log(res);
      if(err) {
        console.log(err);
        loginComponent.setState({ error: true });

      } else if(res.status === 200) {
        var parseRes = JSON.parse(res.text);
        localStorage.setItem('jwtAlum', JSON.stringify(parseRes.token));
        //else redirect based on permissions
        auth.checkToken(function(err, response) {
          if(parseInt(response.text) === 1) {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/';
          }

        });
      } 
    });


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
            type="password"
            ref="password"
            placeholder='password'
            groupClassName='login-password'
            onChange={this.handleChange} />
          <ButtonInput bsStyle="primary" bsSize="large" type="submit" block>Login</ButtonInput>

        </form>
        {this.state.error && (
          <p>You have supplied invalid login information. Please Try Again.</p>
        )}

      </div>
    );
  }
})




module.exports = Login;
