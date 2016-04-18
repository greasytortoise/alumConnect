import React from 'react'
import { Link } from 'react-router'

class Sidebar extends React.Component {
  render() {
    return(
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="/">
              Hack Reactor Home
            </a>
          </li>
          <li>
            <Link to="/dashboard">View Users</Link>
          </li>
          <li>
            <Link to="/dashboard/newuser">Add New User</Link>
          </li>
          <li>
            <Link to="/dashboard/groups">Manage Groups</Link>
          </li>
          <li>
            <Link to="/dashboard/sites">Manage Sites</Link>
          </li>
          <li>
            <Link to="/dashboard/profile-fields">Manage Profile Fields</Link>
          </li>
        </ul>
      </div>
    )
  }
}

module.exports = Sidebar;
