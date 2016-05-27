import React from 'react';
import Griddle from 'griddle-react';
import RestHandler from '../../util/RestHandler';
import $ from 'jquery';
import request from 'superagent';
import { Select, Modal, Button, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router';
import GroupsView from './UsersGroupsView.js';

class DashboardUsers extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      visOpts: ['Yes', 'No'],
      users: [],
      key: 666,
      showDelete: false,
      toBeDeleted: {
        id: null,
        name: null,
      },
    };
  }

  componentWillMount() {
    RestHandler.Get('/db/users', (err, res) => {
      var users = res.body.reverse();
      for (var i = 0; i < users.length; i++) {
        users[i].Delete = this.getDeleteLink(users[i].id, users[i].name);
        users[i].Name = this.getProfileLink(users[i].id, users[i].name);
        users[i].Github = this.getGithubLink(users[i].handle);
        users[i].Groups = this.renderProfileGroups(users[i]);
      }
      this.setState({ users: users });
    });
  }
  getProfileLink(id, name) {
    return (
      <div className="userLink">
        <Link to={{ pathname: `/users/${id}` }}>
          {name}
        </Link>
      </div>
   );
  }
  getGithubLink(github) {
    return (
      <div className="ghLink">
        <a href={`https://www.github.com/${github}`}>
          {github}
        </a>
      </div>
   );
  }

  getDeleteLink(id, name) {
    var data = JSON.stringify({ id: id, name: name });
    return (
        <Col xs={4} >
          <div className="deleteLink" data={data}
            onClick={this.setDeleteState.bind(this)}
          >
          </div>
        </Col>
    );
  }

  setDeleteState(e) {
    var data = JSON.parse($(e.target).attr('data'));
    e.preventDefault();
    this.setState({ toBeDeleted: {
      id: data.id,
      name: data.name,
    },
    showDelete: true });
  }

  resetDeleteState() {
    this.setState({ toBeDeleted: {
      id: null,
      name: null,
    },
    showDelete: false });
  }

  deleteUser(e) {
    var that = this;
    e.preventDefault();
    request
      .delete('/dashboard/db/users/user/' + that.state.toBeDeleted.id)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          console.log('User deleted');
          for (var i = 0; i < that.state.users.length; i++) {
            if (that.state.users[i].id == that.state.toBeDeleted.id) {
              that.state.users.splice(i, 1);
              break;
            }
          }
          that.setState({ key: Math.random() });
          that.resetDeleteState();
        }
      });
  }


  closePopup() {
    this.setState({ showDelete: false });
  }

  renderProfileGroups(user) {
    return (
      <GroupsView
      selectedGroups={user.groups}
      />
    );
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.showDelete}
          onHide={this.closePopup.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete user: {this.state.toBeDeleted.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deleteUser.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>
        <h3 className="dashboard-title">Users</h3>
        <Griddle
          results={this.state.users}
          showFilter={true}
          key={this.state.key}
          ref='usertable'
          tableClassName='table'
          useGriddleStyles={false}
          resultsPerPage={40}
          columns={["id", "Name", "Github", "Groups", "Delete"]}/>
      </div>
    );
  }
}

module.exports = DashboardUsers;
