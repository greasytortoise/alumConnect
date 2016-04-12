import React from 'react'
import { Link } from 'react-router'
import { Row, Col, DropdownButton, MenuItem, Input } from 'react-bootstrap';

import RestHandler from '../../util/RestHandler';

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
    const innerDropdown = (
      <DropdownButton bsStyle='default' title='Cohort40'>
        <MenuItem eventKey="40">Cohort40</MenuItem>
        <MenuItem eventKey="39">Cohort39</MenuItem>
        <MenuItem eventKey="38" active>Cohort38</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="0">All Cohorts</MenuItem>
      </DropdownButton>
    );

    var title = 'Cohort38'
    return (
      <div>
        <h2>users</h2>
        <Row className="search-for-users">
          <Col xs={10} sm={10} md={10} lg={10}>
            <Input
              wrapperClassName='input-with-dropdown'
              type='text'
              ref='input'
              onChange={this.handleChange}
              placeholder="Search users"
              addonBefore = {innerDropdown}
              />
          </Col>
        </Row>
        <Row>
          <ul>{this.usersList()}</ul>
        </Row>
      </div>
    )
  }
}

module.exports = Users;
