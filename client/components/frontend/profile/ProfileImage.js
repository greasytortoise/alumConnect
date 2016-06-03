import React from 'react'
import {Image, Button, ButtonInput, Modal, Alert, FormGroup, ControlLabel, Radio} from 'react-bootstrap';
import auth from '../../../util/authHelpers.js'
import RestHandler from '../../../util/RestHandler'
var Dropzone = require('react-dropzone');

//unique photo string: http://stackoverflow.com/questions/1077041
class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: -1,
      permission: 1,
      editModal: false,
      src: undefined
    }
  }

  showEditModal() {
    this.setState({ editModal: true });
  };
  hideEditModal(newImageSrc) {
    this.setState({ editModal: false });
    if(newImageSrc) {
      this.setState({src: newImageSrc});
    }
  };

  componentDidMount() {
    this.getLoggedInUserData();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.profileUserId !== this.props.profileUserId) {
      this.setState({src: nextProps.src});
    }
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
              <Image src={this.state.src || this.props.src} responsive />
              <div className="label-overlay">Change image ✎</div>
            </Button>
           </div>
        )
      } else {
        return(
          <Image src={this.state.src || this.props.src} responsive />
        )
      }
    }
    else {
      return (
        <Image src={this.state.src || this.props.src} responsive />
      )
    }
  }

  render() {
    return (
      <div>
        <SelectImageModal
          fileName={this.state.src || this.props.src}
          show={this.state.editModal}
          onHide={this.hideEditModal.bind(this)}
          userId= {this.props.profileUserId}/>
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
      imageCropStrategy: 'default',
      error: false
    }
  }

  onDrop(files) {
    const fileName = this.props.fileName;
    const file = files[0];
    const data = new FormData()
    data.append('fileName', fileName);
    data.append('photo', file);
    data.append('userId', this.props.userId);
    data.append('cropStrategy', this.state.imageCropStrategy);
    // data.append('userId', file);
    RestHandler.Post('user/uploadimage', data, (err, res) => {
      if(err || res.body.error) {
        var error = err || res.body.error;
        this.setState({error: error});
      } else {
        this.setState({error: false});

        this.props.onHide(res.body.fileName);
      }
    });
   }


  showError() {
    if(this.state.error) {
      return(
        <Alert bsStyle="warning"><b>Warning:</b> {this.state.error}</Alert>
      )
    }
  }

  setImageCropTo(strategy) {
    this.setState({
      imageCropStrategy: strategy
    });
  }

  render() {
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-md">

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-md">Change profile image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.showError()}
          <div>
            <Dropzone
              disablePreview
              onDrop={this.onDrop.bind(this)}
              className="dropzone"
              activeClassName="dropzone-active"
              >
              <div>Drop an image file here <br /> or select an image</div>
            </Dropzone>
          </div>
          <div className="crop-options">
            <FormGroup>
              <ControlLabel>Image crop<a target="_blank" href="https://github.com/greasytortoise/alumConnect/wiki/Uploading-images">(?)</a>:</ControlLabel>
              <Radio inline checked={this.state.imageCropStrategy === 'default'} onClick={this.setImageCropTo.bind(this, 'default')}>Default</Radio>
              <Radio inline checked={this.state.imageCropStrategy === 'top'} onClick={this.setImageCropTo.bind(this, 'top')}>Top</Radio>
              <Radio inline checked={this.state.imageCropStrategy === 'center'} onClick={this.setImageCropTo.bind(this, 'center')}>Center</Radio>
              <Radio inline checked={this.state.imageCropStrategy === 'bottom'} onClick={this.setImageCropTo.bind(this, 'bottom')}>Bottom</Radio>
            </FormGroup>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
};



module.exports = ProfileImage;
