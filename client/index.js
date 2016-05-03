import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'
import App from './components/frontend/App'
import auth from './util/authHelpers.js'
import RestHandler from './util/RestHandler.js'
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


    <Route path="/" component={App} onEnter={auth.requireAuth}>
      <IndexRoute component={Users} onEnter={auth.requireAuth} />
      <Route path="/users/:user" component={Profile} onEnter={auth.requireAuth} />
    </Route>

    <Route path="/login" component={Login} />
    <Route path="/logout" onEnter={auth.logout} />

    <route path="/dashboard" component={Dashboard} onEnter={auth.requireAdmin}>
      <IndexRoute component={DashboardUsers}/>
      <Route path="/dashboard/newuser" component={DashboardNewUser} onEnter={auth.requireAdmin}/>
      <Route path="/dashboard/groups" component={Groups} onEnter={auth.requireAdmin}/>
      <Route path="/dashboard/sites" component={Sites} onEnter={auth.requireAdmin}/>
      <Route path="/dashboard/profile-fields" component={ProfileFields} onEnter={auth.requireAdmin}/>
    </route>
  </Router>
), document.getElementById('app'))

