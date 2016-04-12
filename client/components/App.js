import React from 'react'
import auth from '../authHelpers.js'
import NavLink from './NavLink'
import { Grid } from 'react-bootstrap';


class App extends React.Component {
  render() {
    return(
      <Grid>
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

      </Grid>
    );
  }
}

module.exports = App;
