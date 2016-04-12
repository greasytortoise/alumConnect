import React from 'react'
import NavLink from '../NavLink'
import { Grid } from 'react-bootstrap';


class Dashboard extends React.Component {
  render() {
    return(
      <Grid>
        <ul role="nav">
          <li><NavLink to="/dashboard" onlyActiveOnIndex>Dashboard</NavLink></li>
          <li><NavLink to="/dashboard/users">users</NavLink></li>
        </ul>
        {this.props.children}
      </Grid>
    );
  }
}

module.exports = Dashboard;
