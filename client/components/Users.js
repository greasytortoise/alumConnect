import React from 'react'
import { Link } from 'react-router'
import RestHandler from '../util/RestHandler';

class Users extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    RestHandler.Get('/db/users', (err, res) => {
      this.setState({users: res.body})
    });
  }

  usersList() {
    return this.state.users.map(function(user, index) {
      var {username, id} = user
      return(
        <li key={id}>
          <Link to={{pathname: `users/${id}`}}>{username}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>users</h2>
          <ul>{this.usersList()}</ul>
      </div>
    )
  }
}

module.exports = Users;
