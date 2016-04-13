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
    if(!getToken()){
      this.setState({ error: true });

    } else {
      var token = auth.parseJwt();

      console.log(token);
      //else redirect based on permissions
      if(token.perm === 1) {
        this.context.router.replace('/dashboard');
      } else {
        this.context.router.replace('/users');
      }
    }

  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value
    auth.login(email, pass);
  },

  render() {
    return (
      <div id='loginFormWrapper'>
        <form id='loginForm'>
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
          <ButtonInput bsStyle="primary" bsSize="large" block>Login</ButtonInput>

        </form>

        <ul role="nav">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/users">users</Link></li>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" placeholder="DonaldTrump@MakeAmericaGreatAgain.com" /></label>
          <label><input ref="pass" placeholder="password" type='password' /></label>
          <button type="submit">login</button>
          {this.state.error && (
            <p>HANDS TOO SMALL!</p>
          )}
        </form>
      </div>
    );
  }
})




module.exports = Login;
