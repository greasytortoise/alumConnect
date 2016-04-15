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
      filledOutProfileFields: [],
      availableProfileFields: [],
      editing: 0
    };
  }

  componentDidMount() {
    this.getUserProfile();
    this.getAvailableFields();
  }

  getAvailableFields() {
    var url = '/db/fields';
    RestHandler.Get(url, (err, res) => {
      this.setState({
        availableProfileFields: res.body
      });
      console.log(res.body);
    });
  }

  getUserProfile() {
    var url = '/db/users/user/' + this.props.params.user;
    RestHandler.Get(url, (err, res) => {
      this.setState({
        username: res.body.user.username,
        image: "../../../assets/matt.jpg",
        filledOutProfileFields: res.body.userInfo
      });
      console.log(res.body);
    });
  }

  handleEditProfile(event, filledOutProfileFields) {
    this.state.editing
    ? this.setState({ editing: 0})
    : this.setState({ editing: 1});
  }

  profile() {

    // return this.state.availableProfileFields.map((detail, index) => {
    //   return (<ProfileField
    //     filledOutProfileFields={detail}
    //     editing={this.state.editing} />);
    // });

    return this.state.filledOutProfileFields.map((detail, index) => {
      return (<ProfileField
        fieldDetails={detail}
        editing={this.state.editing} />);
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
