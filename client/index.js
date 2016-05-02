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


    <Route path="/" component={App} onEnter={requireAuth()}>
      <IndexRoute component={Users} onEnter={requireAuth} />
      <Route path="/users/:user" component={Profile} onEnter={requireAuth} />
    </Route>
    <Route path="/login" component={Login} >
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

function validateLogin(err, res) {
  if(err || res.status !== 200) {
    // replace({
    //   pathname: '/login',
    //   state: { nextPathname: nextState.location.pathname }
    // });
    this.transitionTo('/login')

  }

};
function redirectSwitch(nextState, replace, callback) {
  RestHandler.Get('/auth/getpermissions', function(err, res) {
    // if(res.text === '1') {
    //   callback()
    //   // window.location.href = '/dashboard';
    // } else {
    //   // window.location.href = '/';
    // }
    callback(err, res);
  });

};

function requireAuth(nextState, replace, callback) {
  // if (!auth.loggedIn()) {
  //   replace({
  //     pathname: '/login',
  //     state: { nextPathname: nextState.location.pathname }
  //   })
  // }
  console.log('!!!!!!!!!!');
  RestHandler.Get('/auth/islogged', function(err, res) {
    console.log(res);
    // if(res.status === 200) {
    //   replace({
    //     pathname: '/login',
    //     state: { nextPathname: nextState.location.pathname }
    //   });
    // }
      // callback(err, res);
      if(err || res.statusCode !== 200) {
        console.log('THINFASDKASSAD');
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        });
      }

  });
};


function requireAdmin(nextState, replace) {
  // var token = auth.parseJwt();
  // if(!auth.loggedIn() || token.perm !== 1) {
  //   replace({
  //     pathname: '/login',
  //     state: { nextPathname: nextState.location.pathname }
  //   });
  // }
  RestHandler.Get('/auth/isadmin', function(err, res) {
    // if(res.status !== 200) {
    //   replace({
    //     pathname: '/login',
    //     state: { nextPathname: nextState.location.pathname }
    //   });
    // }
      callback(err, res);

  });
};
