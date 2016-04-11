import React from 'react'
import NavLink from '../NavLink'

class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <ul role="nav">
          <li><NavLink to="/dashboard" onlyActiveOnIndex>Dashboard</NavLink></li>
          <li><NavLink to="/dashboard/users">users</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

module.exports = Dashboard;
