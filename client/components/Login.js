import React from 'react';
import Router from 'react-router';
import auth from '../authHelpers.js';

var Promise = require('bluebird');


const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
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
    // auth.login(email, pass, (loggedIn) => {
    //   if (!loggedIn)
    //     return this.setState({ error: true })

    //   const { location } = this.props

    //   if (location.state && location.state.nextPathname) {
    //     this.context.router.replace(location.state.nextPathname)
    //   } else {
    //     this.context.router.replace('/')
    //   }
    // })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" placeholder="DonaldTrump@MakeAmericaGreatAgain.com" /></label>
        <label><input ref="pass" placeholder="password" type='password' /></label>
        <button type="submit">login</button>
        {this.state.error && (
          <p>HANDS TOO SMALL!</p>
        )}
      </form>
    );
  }
})




module.exports = Login;
