import React from 'react'
import ProfileField from './ProfileField'
import ProfileEditButton from './ProfileEditButton'

// import Image from './Image.js'
import RestHandler from '../../../util/RestHandler'

import { Button, Grid, Row, Col, Image} from 'react-bootstrap';

var _map = require('lodash/map');
var auth = require('../../../util/authHelpers.js');


class Profile extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      profileData: {},
      editing: 0
    };
    this.profileEdits = {}
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
      this.setState({
        profileData: res.body,
      });
      this.profileEdits = {
        user: res.body.user,
        sites: {},
        userInfo:{}
      }
    });
  }

  saveUserProfile(callback) {
    var url = '/db/users/user/' + this.props.params.user;
    var data = this.profileEdits;
    data.userInfo = _map(data.userInfo, function(val){return val});
    data.sites = _map(data.sites, function(val){return val});
    data.token = auth.getToken();
    RestHandler.Post(url, data, (err, res) => {
      if (err) {return err;}
      callback(res);
    });
  }

  profileEditButtonTapped() {
    this.state.editing
      ? this.setState({ editing: 0})
      : this.setState({ editing: 1})
  }
  profileSaveButtonTapped() {
    this.saveUserProfile( () => {
      this.setState({ editing: 0})
    });
  }

  profile() {
    if(this.state.profileData.userInfo) {
      return this.state.profileData.userInfo.map((detail, index) => {
        return (<ProfileField
          fieldDetails={detail}
          editing={this.state.editing}
          key={index}
          stageProfileEdits = {this.stageProfileEdits.bind(this)} />);
      });
    }
  }

  stageProfileEdits(callback) {
    callback(this.profileEdits.userInfo);
    console.log(this.profileEdits);
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
                <Image src={image} responsive />
              </Col>
              <Col xs={7} md={8}>
                <h2>{username}</h2>
                <ProfileEditButton
                  editing = {this.state.editing}
                  profileEditButtonTapped = {this.profileEditButtonTapped.bind(this)}
                  profileSaveButtonTapped = {this.profileSaveButtonTapped.bind(this)} />
              </Col>
            </Row>
          </Grid>
        </div>
        <div className = 'section'>
          {this.profile()}
          <ProfileEditButton
            editing = {this.state.editing}
            hideEditButton = {true}
            profileEditButtonTapped = {this.profileEditButtonTapped.bind(this)}
            profileSaveButtonTapped = {this.profileSaveButtonTapped.bind(this)} />
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
