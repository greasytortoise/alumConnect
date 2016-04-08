import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import App from './components/App'
import AppAuth from './components/AppAuth'
import Edit from './components/Edit'
import Users from './components/Users'
import User from './components/User'
import auth from './authHelpers.js'
import Login from './components/Login'
import Profile from './components/Profile'


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/users" component={Users}/>
      <Route path="/users/:user" component={Profile}/>
      <Route path="/login" component={Login}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/edit" component={Edit}/>
      <Route path="/login" component={Login} />*/}
      <Route path="/logout" component={AppAuth.Logout} />
      <Route path="/dashboard" component={AppAuth.Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('app'))


function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
