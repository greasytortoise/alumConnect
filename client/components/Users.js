import React from 'react'
import { Link } from 'react-router'

var request = require('superagent');

class Users extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    request
      .get('/db/users')
      .end((err, res) => {
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
