import React from 'react'
import Bio from './helperProfile/bioDetails.js'
import Image from './helperProfile/Image.js'
import Edit from './helperProfile/EditProfile.js'

import { Link } from 'react-router'

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
    var url = '/db/bios/' + this.props.params.user;
    request
      .get(url)
      .end((err, res) => {
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
          <Edit bioDetails={this.state.bioDetails} image={this.state.image} />
        </div>
      );
    }
  }

  render() {
    console.log(this.props.params.user);
    console.log('resp', this.state.bioDetails);
    return (
      <div>
        <Link to={'/edit'} onClick={this.handleProfileChange.bind(this)}>
          Edit Profile</Link>
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
