import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from '../authHelpers.js'
import Login from './Login'
import Profile from './frontend/profile/Profile'

const AppAuth = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: auth.loggedIn()
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth(this.loggedIn);
    auth.login();
  },

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/login">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
})



module.exports = {
  App: AppAuth
};
