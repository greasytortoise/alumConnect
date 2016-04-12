import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'
import App from './components/frontend/App'
import auth from './authHelpers.js'
import AppAuth from './components/AppAuth'
import Profile from './components/frontend/profile/Profile'
import Users from './components/frontend/Users'
import Login from './components/Login'
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
      <Route path="/logout" component={Login} onEnter={auth.logout}/>
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
