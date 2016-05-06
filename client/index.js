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


    <Route path="/" component={App} onfEnter={auth.requireAuth}>
      <IndexRoute component={Users} onfEnter={auth.requireAuth} />
      <Route path="/users/:user" component={Profile} onfEnter={auth.requireAuth} />
    </Route>

    <Route path="/login" component={Login} />
    <Route path="/logout" onfEnter={auth.logout} />

    <route path="/dashboard" component={Dashboard} onfEnter={auth.requireAdmin}>
      <IndexRoute component={DashboardUsers}/>
      <Route path="/dashboard/newuser" component={DashboardNewUser} onfEnter={auth.requireAdmin}/>
      <Route path="/dashboard/groups" component={Groups} onfEnter={auth.requireAdmin}/>
      <Route path="/dashboard/sites" component={Sites} onfEnter={auth.requireAdmin}/>
      <Route path="/dashboard/profile-fields" component={ProfileFields} onfEnter={auth.requireAdmin}/>
    </route>
  </Router>
), document.getElementById('app'))
