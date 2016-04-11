import React from 'react'
import Bio from './helperProfile/bioDetails.js'
import Image from './helperProfile/Image.js'

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
    this._getUserProfile();
  }

  _getUserProfile() {
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

  // _handleEditProfileClick(event, bioDetails) {
  //   event.preventDefault();
  //   this.setState({
  //     editing: 1,
  //     bioDetails: {
  //       
  //     }
  //   });
  // }

  // _handleChangeImage(event, image) {
  //   event.preventDefault();
  //   this.setState({
  //     editing: 1,
  //     image: image
  //   });
  // }

  render() {
    console.log(this.props.params.user);
    console.log('resp', this.state.bioDetails);
    return (
      <div>
        <h3>Preferred name</h3>
        <p>The Donald Trump</p>
        
        <Image image={this.state.image}/>

        <Bio bioDetails={this.state.bioDetails} />

      </div>
    );
  }
}

module.exports = Profile;


// handleChangeImage={this._handleChangeImage.bind(this)}
//handleEditProfileClick={this._handleProfileChange.bind(this)}

// _handleProfileChange(event) {
//   event.preventDefault();
//   console.log(this.refs.val.value);
//   this.setState({value: this.refs.val.value});
// }
