import React from 'react'
import { Link } from 'react-router'
import RestHandler from '../../../util/RestHandler'




class ProfileSidebar extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      groupMembers: {}
    };
  }

  componentDidMount() {
    this.getClassMates(this.props.groupId);
  }

  getClassMates(groupId) {
    var url = '/db/groups/group/' + this.props.groupId;
    RestHandler.Get(url, (err, res) => {
      this.setState({groupMembers: res.body})
    });
  }

  renderSidebar() {
    if(this.state.groupMembers.users) {
      return this.state.groupMembers.users.map(function(user) {
        return(
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            {/*<Link to={`/users/${user.id}`}>{user.username}</Link>*/}
          </li>
        )
      })
    }
  }

  render() {
    return(
        <ul className="sidebar-users">
          <li><h4>{this.props.group} ClassMates</h4></li>

          {this.renderSidebar()}
        </ul>
    )
  }
}

module.exports = ProfileSidebar;
