import React from 'react'
import ProfileField from './ProfileField.js'
import Image from './Image.js'
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
    var url = '/db/users/user/' + this.props.params.user;
    RestHandler.Get(url, (err, res) => {
      this.setState({
        username: res.body.user.username,
        image: "../mockups/assets/donaldtrump.png",
        bioDetails: res.body.userInfo
      });
      console.log(res.body);

    });
  }

  handleEditProfile(event, bioDetails) {
    this.state.editing
    ? this.setState({ editing: 0})
    : this.setState({ editing: 1});
  }

  profile() {

    return this.state.bioDetails.map((detail, index) => {
      return (<ProfileField
        bioDetails={detail}
        editing={this.state.editing} />)
    });
  }

  render() {
    return (
      <div>
        <Image image={this.state.image} />
        <h3>{this.state.username}</h3>
          <Button onClick={this.handleEditProfile.bind(this)}>
            Edit Profile
          </Button>
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
