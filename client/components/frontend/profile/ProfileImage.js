import React from 'react'
import { Image, Button, Modal } from 'react-bootstrap';
import auth from '../../../util/authHelpers.js'


class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: -1,
      permission: 0,
      editModal: false
    }
  }

  showEditModal() {
    this.setState({ editModal: true });
  };
  hideEditModal() {
    this.setState({ editModal: false });
  };

  componentDidMount() {
    this.getLoggedInUserData();
  }

  getLoggedInUserData() {
    //gets the authentication token from util/authHelpers.js
    //and retrieves permission and user id
    // auth.parseJwtAsync((parsedToken) => {
    //   if(parsedToken) {
    //     this.setState({
    //       loggedInUserId: parsedToken.iss,
    //       permission: parsedToken.perm
    //     });
    //   }
    // });
  }


  renderImage() {
    if(this.state.permission === 1 || this.props.profilesUserId === this.state.loggedInUserId) {
      if(this.props.editing) {
        return (
          <div>
            <Image src={this.props.src} responsive />
            <Button bsStyle="primary" onClick={this.showEditModal.bind(this)}>
              Launch small demo modal
            </Button>
           </div>
        )
      } else {
        return(
          <div>
            <Image src={this.props.src} responsive />
          </div>
        )
      }
    }
    else {
      return (
        <Image src={this.props.src} responsive />
      )
    }
  }

  render() {
    return (
      <div>
        <MyLargeModal show={this.state.editModal} onHide={this.hideEditModal.bind(this)} />
        {this.renderImage()}
      </div>
    );
  }
}






const MyLargeModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-md">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-md">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
            <div>
            <form
              name="secret"
              encType="multipart/form-data"
              method="POST"
              action="/user/uploadimage" >
                <input type="hidden" name="title" placeholder="title"/>
                <input type="file" id="profilePic" name="upl"/>
                <br/>
                <input type="submit" value="submit"/>
              </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});



module.exports = ProfileImage;
