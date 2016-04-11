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
  cohortList() {

  }

  render() {
    return (
      <div>
        <h2>users</h2>
          <select>
            <option value="4041">Cohort 40 / 41</option>
            <option value="3839">Cohort 38 / 39</option>
            <option value="3637">Cohort 36 / 37</option>
          </select>
          <input type="text" placeholder="Search users by name" />

          <ul>{this.usersList()}</ul>
      </div>
    )
  }
}

module.exports = Users;
