import React from 'react';
import { Link } from 'react-router';
import { Row, Col, DropdownButton, MenuItem, Input, Image, FormControl, InputGroup } from 'react-bootstrap';
import auth from '../../util/authHelpers.js';

import RestHandler from '../../util/RestHandler';

class Users extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      users: [],
      groups: [],
      selectedGroup: {},
      searchUsersText: ''
    }
  }

  componentWillMount() {
    RestHandler.Get('/db/groups', (err, res) => {
      var groups = res.body.reverse();
      var initialGroup = res.body[0];
      if(localStorage.selectedGroup) {
        initialGroup = JSON.parse(localStorage.getItem('selectedGroup'));
      }
      this.setState({ groups: groups });
      this.setState({selectedGroup: initialGroup });
      this.getUsers(initialGroup.id);
    });
  }

  getUsers(groupId) {
    var getUrl = groupId ? '/db/groups/group/' + groupId : '/db/users';
    // var getUrl = groupId ? '/db/groups/group/' + groupId : '/db/users'

    RestHandler.Get(getUrl, (err, res) => {
      this.setState({ users: res.body.users });
    });
  }

  usersList() {
    var searchUsersText = this.state.searchUsersText;
    var users = this.state.users.filter(function(user) {
      return user.name.toLowerCase().includes(searchUsersText);
    });

    return users.sort(function(a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }).map(function(user, index) {
      var {name, id, image} = user
      return(
        <Col xs={6} sm={4} md={3} lg={3} key={id}>
          <Link to={{pathname: `/users/${id}`}}>
            <div
              className="user-card">
              <Image
                src={image}
                responsive
                />
              <h4>{name}</h4>
            </div>
          </Link>
        </Col>
      );
    });
  }

  handleGroupSelect(key, evt) {
    this.setState({'selectedGroup': key});
    localStorage.setItem('selectedGroup', JSON.stringify(key));
    this.getUsers(key.id);
  }

  renderGroups(handleGroupSelect) {
    return this.state.groups.map (function(group) {
      var {id, group_name} = group;
      return(
        <MenuItem key={id} eventKey={group} onSelect={handleGroupSelect}>{group_name}</MenuItem>
      );
    });
  }

  handleFilterUsersInput(e) {
    var filterText = e.target.value.toLowerCase();
    this.setState({searchUsersText: filterText});
  }

  render() {
    var groupName = this.state.selectedGroup.group_name || '';
    const innerDropdown = (
      <DropdownButton bsStyle='default' title={groupName} id='dropdown-groups'>
        {this.renderGroups(this.handleGroupSelect.bind(this))}
      </DropdownButton>
    );

    return (
      <div>
        <Row className="search-for-users">
          <Col xs={12}>
            <InputGroup className="input-with-dropdown">
              <InputGroup.Addon>{innerDropdown}</InputGroup.Addon>
              <FormControl
                type='text'
                ref='searchusers'
                onChange={this.handleFilterUsersInput.bind(this)}
                placeholder="Search users"
                bsSize='large'/>
            </InputGroup>
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
