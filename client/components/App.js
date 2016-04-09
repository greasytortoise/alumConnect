import React from 'react'
import auth from '../authHelpers.js'
import NavLink from './NavLink'

class App extends React.Component {
  render() {
    return(
      <div>
        <h2>Website title</h2>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/users">Users</NavLink></li>
          <li>
            {auth.loggedIn()
              ? (<NavLink to="/logout">Log out</NavLink>)
              : (<NavLink to="/login">Sign in</NavLink>)}
          </li>
        </ul>
        {this.props.children}

      </div>
    );
  }
}

module.exports = App;
