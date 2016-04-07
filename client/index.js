import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App'
import User from './components/User'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/user" component={User}/>
  </Router>
), document.getElementById('app'))
