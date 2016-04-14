import React from 'react'
import { Link } from 'react-router'

class Sidebar extends React.Component {
  render() {
    return(
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="#">
              Start Bootstrap
            </a>
          </li>
          <li>
            <Link to="/dashboard/groups">Groups</Link>
          </li>
          <li>
            <Link to="/dashboard/users">Users</Link>
          </li>
          <li>
            <Link to="/dashboard/newuser">New User</Link>
          </li>
          <li>
            <Link to="/dashboard/sites">Sites</Link>
          </li>
          <li>
            <Link to="/dashboard/profile-fields">ProfileFields</Link>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    )
  }
}

module.exports = Sidebar;
