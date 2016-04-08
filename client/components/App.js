import React from 'react'
import { Link } from 'react-router'
import auth from '../authHelpers.js'

class App extends React.Component {
  render() {
    return(
      <div>
        <h2>Website title</h2>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li>
            { auth.loggedIn() ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
        </ul>
        {this.props.children}

      </div>
    );
  }
}

module.exports = App;
