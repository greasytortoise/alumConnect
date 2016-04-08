import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from '../authHelpers.js'
import Login from './Login'
import Profile from './Profile'

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
    auth.login()
  },

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/dashboard">SPARKLY RAINBOW UNICORNS HERE!!!</Link></li>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
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

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>COOL STUFF</p>
        <p>{token}</p>
      </div>
    )
  }
})

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
  }
})

module.exports = {
  App: AppAuth,
  Dashboard: Dashboard,
  Logout: Logout
};
