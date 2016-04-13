import React from 'react'
import { Link } from 'react-router'
import { Row, Col, DropdownButton, MenuItem, Input, Grid, Image, Thumbnail } from 'react-bootstrap';

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
    var userCount = this.state.users.length;
    return this.state.users.map(function(user, index) {
      var {username, id} = user
      return(
        <Col xs={6} sm={4} md={4}>
          <div className="user-card">
            <Image
              src='https://pixabay.com/static/uploads/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              responsive
              />
            <h4><Link to={{pathname: `users/${id}`}}>{username}</Link></h4>
          </div>
        </Col>
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
          {this.usersList()}
        </Row>
      </div>
    )
  }
}

module.exports = Users;
