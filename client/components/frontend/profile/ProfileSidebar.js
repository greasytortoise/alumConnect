import React from 'react'
import { Link } from 'react-router'




class ProfileSidebar extends React.Component {

  getClassMates() {
    var url = '/db/groups/' + this.props.params.groupId;
    RestHandler.Get(url, (err, res) => {

    });
  }

  render() {
    return(
        <ul className="sidebar-nav">
          <li><Link to="/dashboard">View Users</Link></li>
          <li><Link to="/dashboard/newuser">Add New User</Link></li>
          <li><Link to="/dashboard/groups">Manage Groups</Link></li>
          <li><Link to="/dashboard/sites">Manage Sites</Link></li>
          <li><Link to="/dashboard/profile-fields">Manage Profile Fields</Link></li>
        </ul>
    )
  }
}

module.exports = ProfileSidebar;
