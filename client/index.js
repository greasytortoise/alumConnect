import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, State } from 'react-router'
import App from './components/App'
import User from './components/User'
import Login from './components/Login'
import Profile from './components/Profile'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/user" component={User}/>
      <Route path="/login" component={Login}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/edit" component={Edit}/>
    </Route>
  </Router>
), document.getElementById('app'))
