import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'
import App from './components/App'
import AppAuth from './components/AppAuth'
import Edit from './components/helperProfile/EditProfile.js'
import Users from './components/Users'
import User from './components/User'
import auth from './authHelpers.js'
import Login from './components/Login'
import Profile from './components/Profile'
import Dashboard from './components/admin/Dashboard'
import DashboardHome from './components/admin/DashboardHome'
import DashboardUsers from './components/admin/DashboardUsers'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {/*<IndexRoute component={Users}/>*/}
      <Route path="/users" component={Users}/>
      <Route path="/users/:user" component={Profile}/>
      <Route path="/login" component={Login}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/edit" component={Edit}/>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Login}  onEnter={auth.logout}/>
    </Route>
    <route path="/dashboard" component={Dashboard}>
      <IndexRoute component={DashboardHome}/>
      <Route path="/dashboard/users" component={DashboardUsers}/>

    </route>
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
