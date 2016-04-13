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
      username: '',
      bioDetails: [],
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
        username: res.body.user.username,
        image: "../mockups/assets/donaldtrump.png",
        bioDetails: res.body.userInfo
      });
    });
  }

  handleEditProfile(event, bioDetails) {
    
    this.state.editing
    ? this.setState({ editing: 0})
    : this.setState({ editing: 1});
  }

  profile() {

    return this.state.bioDetails.map((detail, index) => {
      return (<Bio
        bioDetails={detail}
        editing={this.state.editing} />)
    });

    // return(
    //   <div>
    //     <Image image={this.state.image} />
    //     <Bio bioDetails={this.state.bioDetails} />
    //   </div>
    // );
    //Normal

    // <div>
    //   <Edit bioDetails={this.state.bioDetails} image={this.state.image}
    //     handleProfileChange={this.handleProfileChange.bind(this)}/>
    // </div>

  }

  render() {
    return (
      <div>
        <Button onClick={this.handleEditProfile.bind(this)}>
          Edit Profile
        </Button>
        <h3>{this.state.username}</h3>

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
