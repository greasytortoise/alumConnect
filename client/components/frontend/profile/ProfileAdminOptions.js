import React from 'react'
import { FormControl, Row, Col, Checkbox, Button, InputGroup, Modal } from 'react-bootstrap';


class ProfileAdminOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showDelete: false,
      hasAdminAccess: false,
      userIsHidden: false
    };
  }

  componentDidMount() {
    this.setState({value: this.props.siteDetails.value})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      this.setState({value: nextProps.siteDetails.value})
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
    var that = this;
    e.preventDefault();
    request
      .delete('/dashboard/db/users/user/' + that.state.profileData.user.id)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          console.log('User deleted');
          that.resetDeleteState();
          window.location.href = '/';
        }
      });
  }

  closePopup() {
    this.setState({ showDelete: false });
  }

  renderProfileAdminOptions() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={5}>
            <Checkbox
              checked={this.state.permission}
              onChange= {() => {
                this.setState({permission: !this.state.permission});
              }}>Admin Access</Checkbox>
          </Col>
          <Col xs={4}>
            <Checkbox
              checked={this.state.public}
              onChange= {() => {
                this.setState({public: !this.state.public});
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
    );
  }

  render() {
    return (
      <div>
      {this.renderProfileAdminOptions()}
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
