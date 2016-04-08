import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from './authHelpers.js'
import Login from './components/Login'
import Profile from './components/Profile'

const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <ul>

          <li><Link to="/dashboard">SPARKLY RAINBOW UNICORNS HERE!!!</Link></li>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
})

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>COOL STUFF</p>
        <p>{token}</p>
      </div>
    )
  }
})





const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
  }
})


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/user" component={User}/>
      <Route path="/login" component={Login}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/edit" component={Edit}/>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
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

