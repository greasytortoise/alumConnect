import React from 'react';
import Griddle from 'griddle-react';
import RestHandler from '../../util/RestHandler';
import $ from 'jquery';
import request from 'superagent';
import { Select, Input, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router';

var rowMetadata = {
    "bodyCssClassName": function(rowData) {
        if (rowData.action === "added") {
            return "green-row";
        } else if (rowData.action === "removed") {
            return "red-row";
        } else if (rowData.action === "transfer") {
            return "blue-row";
        }
        return "default-row";
    },
};

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
      var users = res.body;
      for (var i = 0; i < users.length; i++) {
        users[i].Delete = this.getDeleteLink(users[i].id, users[i].name);
        users[i].Profile = this.getProfileLink(users[i].id);
      }
      this.setState({ users: users });

    });
  }
  getProfileLink(id) {
    return (
      <div className="userLink"
      >
        <Link to={{ pathname: `/users/${id}` }}>
          View/Edit
        </Link>
      </div>
   );
  }

  getDeleteLink(id, name) {
    var data = JSON.stringify({ id: id, name: name });
    return (
      <div className="deleteLink" data={data}
        onClick={this.setDeleteState.bind(this)}
      >
      </div>
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
          // that.setState({ key: Math.random() });
          that.resetDeleteState();
        }
      });
  }
  

  closePopup() {
    this.setState({ showDelete: false });
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
            Are you sure you want to delete user {this.state.toBeDeleted.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deleteUser.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>
        <h3 className="dashboard-title">Users</h3>
        <Griddle
          results={this.state.users}
          rowMetadata={rowMetadata}
          showFilter={true}
          key={this.state.key}
          ref='usertable'
          tableClassName='table'
          useGriddleStyles={false}
          resultsPerPage={25}
          columns={["id", "name", "email", "Profile", "Delete"]}/>
      </div>
    );
  }
}

module.exports = DashboardUsers;
