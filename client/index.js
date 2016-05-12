import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute, transition } from 'react-router'
import Promise from 'bluebird';
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

const restoreSession = () => {
  return new Promise((resolve, reject) => {
    RestHandler.Get('/auth/sessionreload', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        resolve(res.statusCode);
      }
    });
  });
};

const restoreCookies = () => {
  return new Promise((resolve, reject) => {
    RestHandler.Get('/auth/refreshcookies', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        resolve(res.statusCode);
      }
    });
  });
};

const doRender = () => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={auth.requireAuth}>
        <IndexRoute component={Users} onEnter={auth.requireAuth} />
        <Route path="/users/:user" component={Profile} onEnter={auth.requireAuth} />
      </Route>

      <Route path="/login" component={Login} />
      <Route path="/auth/logout" />

      <route path="/dashboard" component={Dashboard} onEnter={auth.requireAdmin}>
        <IndexRoute component={DashboardUsers}/>
        <Route path="/dashboard/newuser" component={DashboardNewUser} onEnter={auth.requireAdmin}/>
        <Route path="/dashboard/groups" component={Groups} onEnter={auth.requireAdmin}/>
        <Route path="/dashboard/sites" component={Sites} onEnter={auth.requireAdmin}/>
        <Route path="/dashboard/profile-fields" component={ProfileFields} onEnter={auth.requireAdmin}/>
      </route>
    </Router>
  ), document.getElementById('app'));
};

restoreSession()
  .then((status) => {
    if (status === 200) {
      restoreCookies()
        .then(() => {
          doRender();
        });
    } else {
      doRender();
    }
  });

