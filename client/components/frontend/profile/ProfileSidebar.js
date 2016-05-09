import React from 'react'
import { Link } from 'react-router'
import RestHandler from '../../../util/RestHandler'
var _map = require('lodash/map')




class ProfileSidebar extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      usersGroups: {}
    };
  }

  componentDidMount() {
    this.getGroupMates(this.props.groups);
  }

  getGroupMates(groups) {
    for(var key in groups) {
      var url = '/db/groups/group/' + key;
      var classMates = {};
      RestHandler.Get(url, (err, res) => {
        classMates[res.body.group_name] = res.body.users;
        this.setState({usersGroups: classMates})
      });
    }
  }

  renderSidebar() {
    var usersGroups = this.state.usersGroups;
    return _map(usersGroups, (members, title) => {
      return(
        this.renderSidebarGroup(title, members)
      );
    })
  }
  renderSidebarGroup(groupTitle, members) {
    return (
      <ul className="sidebar-users">
        <li><h4>{groupTitle} ClassMates</h4></li>
        {this.renderGroupMembers(members)}
      </ul>
    );
  }

  renderGroupMembers(members) {
    return members.map(function(user) {
      return(
        <li key={user.id}>
          <Link to={`/users/${user.id}`}  activeClassName="active">{user.username}</Link>
        </li>
      )
    });
  }

  render() {
    return(
      <div>{this.renderSidebar()}</div>
    )
  }
}

module.exports = ProfileSidebar;
