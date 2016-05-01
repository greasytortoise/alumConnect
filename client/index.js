import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'
import App from './components/frontend/App'
import auth from './util/authHelpers.js'
import Profile from './components/frontend/profile/Profile'
import Users from './components/frontend/Users'
import Login from './components/Login'
import Dashboard from './components/admin/Dashboard'
import DashboardHome from './components/admin/DashboardHome'
import DashboardUsers from './components/admin/DashboardUsers'
import DashboardNewUser from './components/admin/DashboardNewUser'
import Groups from './components/admin/Groups/Groups'
import Sites from './components/admin/Sites/Sites'
import ProfileFields from './components/admin/ProfileFields/ProfileFields'

render((
  <Router history={browserHistory}>

    <Route path="/login" component={Login}/>
    <Route path="/logout" component={Login} onEnter={auth.logout}/>

    <Route path="/" component={App}>
      <IndexRoute component={Users}/>
      <Route path="/users/:user" component={Profile}/>
    </Route>
    <Route path="/auth" component={Login}>
      <IndexRoute component={Login}/>
      <Route path="/auth/callback" onEnter={redirectSwitch}/>
    </Route>

    <route path="/dashboard" component={Dashboard} onEnter={requireAdmin}>
      <IndexRoute component={DashboardUsers}/>
      <Route path="/dashboard/newuser" component={DashboardNewUser} onEnter={requireAdmin}/>
      <Route path="/dashboard/groups" component={Groups} onEnter={requireAdmin}/>
      <Route path="/dashboard/sites" component={Sites} onEnter={requireAdmin}/>
      <Route path="/dashboard/profile-fields" component={ProfileFields} onEnter={requireAdmin}/>
    </route>
  </Router>
), document.getElementById('app'))

function redirectSwitch() {
  if(false) {
    window.location.href = '/dashboard';
  } else {
    window.location.href = '/';
  }
}

function requireAuth(nextState, replace) {
  // if (!auth.loggedIn()) {
  //   replace({
  //     pathname: '/login',
  //     state: { nextPathname: nextState.location.pathname }
  //   })
  // }
}


function requireAdmin(nextState, replace) {
  // var token = auth.parseJwt();
  // if(!auth.loggedIn() || token.perm !== 1) {
  //   replace({
  //     pathname: '/login',
  //     state: { nextPathname: nextState.location.pathname }
  //   });
  // }
}
