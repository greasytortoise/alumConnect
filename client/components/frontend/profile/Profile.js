import React from 'react'
import Bio from './bioDetails.js'
import Image from './Image.js'
import Edit from './EditProfile.js'
import RestHandler from '../../../util/RestHandler'
import { Button } from 'react-bootstrap';


var request = require('superagent');

class Profile extends React.Component {

  constructor (props) {
    super (props);

    this.state = {
      image: 'Hello',
      bioDetails: {},
      editing: 0
    };
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile() {
    var url = '/db/users/' + this.props.params.user;
    RestHandler.Get(url, (err, res) => {
      this.setState({
        image: "../mockups/assets/donaldtrump.png",
        bioDetails: res.body.bio
      })
    });
  }

  handleProfileChange(event, bioDetails) {
    event.preventDefault();
    this.setState({
      editing: 1
      // bioDetails: bioDetails
    });
  }

  handleChangeImage(event, image) {
    event.preventDefault();
    this.setState({
      editing: 1,
      image: "image"
    });
  }

  profile() {
    if (this.state.editing === 0) {
      return(
        <div>
          <Image image={this.state.image} handleChangeImage={this.handleChangeImage.bind(this)}/>

          <Bio bioDetails={this.state.bioDetails}
              handleEditProfileClick={this.handleProfileChange.bind(this)}/>
        </div>
      );
    } else {
      return(
        <div>
          <Edit bioDetails={this.state.bioDetails} image={this.state.image}
            handleProfileChange={this.handleProfileChange.bind(this)}/>
        </div>
      );
    }
  }

  render() {
    console.log(this.props.params.user);
    console.log('resp', this.state.bioDetails);
    return (
      <div>
        <Button onClick={this.handleProfileChange.bind(this)}>
          Edit Profile</Button>
        <h3>{this.state.bioDetails.name}</h3>

        <div>{this.profile()}</div>

      </div>
    );
  }
}

module.exports = Profile;


// _handleProfileChange(event) {
//   event.preventDefault();
//   console.log(this.refs.val.value);
//   this.setState({value: this.refs.val.value});
// }
