import React from 'react'
import ProfileField from './ProfileField.js'
// import Image from './Image.js'
import RestHandler from '../../../util/RestHandler'
import { Button, Grid, Row, Col, Image} from 'react-bootstrap';


var request = require('superagent');

class Profile extends React.Component {

  constructor (props) {
    super (props);

    this.state = {
      profileData: {},
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
    });
  }

  getUserProfile() {
    var url = '/db/users/user/' + this.props.params.user;
    RestHandler.Get(url, (err, res) => {
      // console.log(res.body)
      this.setState({
        profileData: res.body,
      });
    });
  }

  handleEditProfile(event, filledOutProfileFields) {
    this.state.editing
    ? this.setState({ editing: 0})
    : this.setState({ editing: 1});
  }

  profile() {

    // return this.state.availableProfileFields.map((field, index) => {
    //
    // // if filledOutProfileFields contains the field.id
    // // set the value to the value
    // // else set value to ''
    // // if the balue is blank don't render it on the front end.
    //
    // field.value = ''
    // return (<ProfileField
    //   fieldDetails={field}
    //   editing={this.state.editing} />);
    // });
    if(this.state.profileData.userInfo) {
      return this.state.profileData.userInfo.map((detail, index) => {
        return (<ProfileField
          fieldDetails={detail}
          editing={this.state.editing}
          key={index} />);
      });
    }
  }

  render() {
    var username = ''
    var image = ''
    if (this.state.profileData.user) {
      username = this.state.profileData.user.username
      image = this.state.profileData.user.image
    }

    return (
      <div>
        <div className = 'section'>
          <Grid>
            <Row>
              <Col xs={5} md={4}>
                <Image src={image}
                   responsive />
              </Col>
              <Col xs={7} md={8}>
                <h2>{username}</h2>
                <Button onClick={this.handleEditProfile.bind(this)}>
                  Edit Profile
                </Button>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className = 'section'>
          {this.profile()}
        </div>
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
