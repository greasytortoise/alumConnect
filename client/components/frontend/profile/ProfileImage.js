import React from 'react'
import { Image, Button, ButtonInput, Modal, } from 'react-bootstrap';
import auth from '../../../util/authHelpers.js'


class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: -1,
      permission: 1,
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
            <Button
              bsStyle="link"
              className="change-image-button"
              onClick={this.showEditModal.bind(this)}>
              <Image src={this.props.src} responsive />
              <div className="label-overlay">Change image ✎</div>
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
        <SelectImageModal imageUrl={this.props.src}  show={this.state.editModal} onHide={this.hideEditModal.bind(this)} />
        {this.renderImage()}
      </div>
    );
  }
}





class SelectImageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedImage: undefined,
    }
  }

  doSomething() {
    console.log('heyyy');
  };

  render() {
    console.log(this.props);
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
                <input
                  type="hidden"
                  name="title"
                  value={this.props.imageUrl}
                  placeholder="title"/>
                <input
                  type="file"
                  id="profilePic"
                  name="upl"/>
                <br/>
                <input type="submit" value="submit"/>
                {/*<ButtonInput
                  type="submit"
                  value="Submit" />*/}

              </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};



module.exports = ProfileImage;
