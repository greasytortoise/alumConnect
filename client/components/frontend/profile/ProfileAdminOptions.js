import React from 'react'
import { FormControl, Row, Col, Checkbox, Button, InputGroup, Modal } from 'react-bootstrap';
import RestHandler from '../../../util/RestHandler'


class ProfileAdminOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      hasAdminAccess: false,
      userIsPublic: false
    };
  }

  componentDidMount() {
    this.setState({
      hasAdminAccess: this.props.permission,
      userIsPublic: this.props.public,
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      this.setState({
        hasAdminAccess: nextProps.permission,
        userIsPublic: nextProps.public,
      });
    }
  }
  setDeleteState(e) {
    e.preventDefault();
    this.setState({
      showDelete: true,
    });
  }

  resetDeleteState() {
    this.setState({
      showDelete: false,
    });
  }
  deleteUser(e) {
    e.preventDefault();
    var url = '/db/users/user/' + this.props.userid;
    RestHandler.Delete(url, (err, res) => {
      if(!err) {
        console.log('User deleted');
        this.resetDeleteState();
        window.location.href = '/';
      }
    });
  }

  closePopup() {
    this.setState({ showDelete: false });
  }


  render() {
    this.props.stageProfileEdits((editedObject) => {
      editedObject.user.permission = this.state.hasAdminAccess ? 1 : 0;
      editedObject.user.public = this.state.userIsPublic ? 1 : 0;
    });
    return (
      <div>
        <div>
          <Row className="show-grid">
            <Col xs={5}>
              <Checkbox
                checked={this.state.hasAdminAccess}
                onChange= {() => {this.setState({hasAdminAccess: !this.state.hasAdminAccess});
                }}>Admin Access</Checkbox>
            </Col>
            <Col xs={4}>
              <Checkbox
                checked={!this.state.userIsPublic}
                onChange= {() => {
                  this.setState({userIsPublic: !this.state.userIsPublic});
                }}>
                Hide User</Checkbox>
            </Col>
            <Col xs={3}>
              <Button
                onClick={this.setDeleteState.bind(this)}
                className="delete-user"
                bsStyle="link">✖ Delete User</Button>
            </Col>
          </Row>
        </div>

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
            Are you sure you want to delete this user?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deleteUser.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

module.exports = ProfileAdminOptions;
