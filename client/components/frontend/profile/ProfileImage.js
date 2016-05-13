import React from 'react'
import { Image, Button, ButtonInput, Modal, } from 'react-bootstrap';
import auth from '../../../util/authHelpers.js'
import RestHandler from '../../../util/RestHandler'
var Dropzone = require('react-dropzone');


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

  doSomething(data) {
    // debugger;
    var profilePic = this.refs.profilePic.getValue();
    console.log(profilePic);

    // RestHandler.Post(url, data, (err, res) => {
    //   console.log(data);
    //   if (err) {return err;}
    //   callback(res);
    // });
  };
  //
  // handleSubmit: function(e) {
  //   e.preventDefault();
  // }

  // handleFile: function(e) {
  //   var self = this;
  //   var reader = new FileReader();
  //   var file = e.target.files[0];
  //   debugger;
  //   reader.onload = function(upload) {
  //     self.setState({
  //       data_uri: upload.target.result,
  //     });
  //   }
  //
  //   reader.readAsDataURL(file);
  // }

  onDrop(files) {
     console.log('Received files: ', files);
     var file = files[0];

     var reader = new FileReader();

     reader.onload = function(evt) {

       debugger;
        // xhr.send(evt.target.result);
      };

     reader.readAsBinaryString(file);


     debugger;
     var postData = {file: file, title: this.props.imageUrl}
     RestHandler.Post('user/uploadimage', postData, (err, res) => {
       if(err) {
         debugger;
         console.log(err)
       }
       this.clearForm();
     });

   }

  render() {
    console.log(this.props);
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-md">

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-md">aMofffffdal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wraasdfpped Text</h4>
          <div>


            <Dropzone disablePreview onDrop={this.onDrop.bind(this)}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>


            <form
              name="secret"
              encType="multipart/form-data"
              method="POST"
              onSubmit={this.handleSubmit}
              action="/user/uploadimage" >
              <input
                type="hidden"
                name="title"
                ref="imageUrl"
                value={this.props.imageUrl}
                placeholder="title"/>
              <input
                type="file"
                onChange={this.handleFile}
                ref="profilePic"
                id="profilePic"
                name="upl"/>
              <br/>
              <input type="submit" value="submit"/>
              <ButtonInput
                value="Submit"
                onClick = {this.doSomething.bind(this)} />
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
