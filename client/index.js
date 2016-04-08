import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App'
import Users from './components/Users'
import Edit from './components/Edit'
import User from './components/User'
import Login from './components/Login'
import Profile from './components/Profile'


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/users" component={Users}/>
      <Route path="/users/:user" component={User}/>
      <Route path="/login" component={Login}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/edit" component={Edit}/>
    </Route>
  </Router>
), document.getElementById('app'))
