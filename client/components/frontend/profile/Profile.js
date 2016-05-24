import React from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileImage from './ProfileImage'
import ProfileField from './ProfileField'
import ProfileSite from './ProfileSite'
import ProfileGroups from './ProfileGroups'
import ProfileAdminOptions from './ProfileAdminOptions'
import ProfileEditButton from './ProfileEditButton'
import auth from '../../../util/authHelpers.js'
import RestHandler from '../../../util/RestHandler'
import {findDOMNode} from 'react-dom'
import { InputGroup, ControlLabel, FormControl, Select, Button, Grid, Row, Col, Image} from 'react-bootstrap';
var _map = require('lodash/map');
var _find = require('lodash/find');
var _clone = require('lodash/clone')


class Profile extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      profileData: {},
      editing: 0,
    };

    //if profile is edited / saved. sites and userInfo into will
    // be converted to an arr of objects -- see saveUserProfile()
    this.stagedProfileEdits = {user: {}, sites: {}, userInfo:{}};

  }

  componentWillReceiveProps(nextProps) {
    //For when the route changes from something like /users/3 to /users/6
    //When clicking on the sidebar url
    if (nextProps) {
      this.state = {
        profileData: {},
        editing: 0
      }
      this.getUserProfile(nextProps.params.user);
    }
  }

  componentWillMount() {
    this.getUserProfile(this.props.params.user);
  }


  //getUserProfile does a few things:
  // 1. Gets the users profile (but doesn't update the state yet)
  // 2. Run functions to get all the available fields on the site and splice in
  //    the filled out fields to a profileData object
  // 3. sets the state to profileData, which renders the page!
  // 4. initializes this.stagedProfileEdits.user to currently viewing user
  getUserProfile(userId) {
    var url = '/db/users/user/' + userId;
    RestHandler.Get(url, (err, res) => {
      if (res.body === 'Permission Denied') {
        window.location.href = '/';
      }
      this.spliceFilledOutFieldsIntoAvailableFields(res.body, 'userInfo', '/db/fields', (profileData) => {
        this.spliceFilledOutFieldsIntoAvailableFields(profileData, 'sites', '/db/sites', (profileData) => {
          this.stagedProfileEdits.user = profileData.user;
          this.stagedProfileEdits.groups = _map(profileData.groups, (key, val) => val).join(',')
          this.setState({
            profileData: profileData,
          });
        });
      });
    });
  }

  spliceFilledOutFieldsIntoAvailableFields(profileData, objectToUpdate, url, callback) {
    RestHandler.Get(url, (err, res) => {
      var filledOutFields = profileData[objectToUpdate];
      var availableFields = res.body;
      availableFields.forEach(function(field, i) {
        if (!filledOutFields[field.id]) {
          filledOutFields[field.id] = field;
        }
      });
      profileData[objectToUpdate] = filledOutFields
      callback(profileData)
    });
  }

  renderProfileFields() {
    if(this.state.profileData.userInfo) {
      return _map(this.state.profileData.userInfo, (detail, index) => {
        detail.id = index;
        return (<ProfileField
          fieldDetails={detail}
          editing={this.state.editing}
          key={index}
          stageProfileEdits = {this.stageProfileEdits.bind(this)} />);
      });
    }
  }

  renderProfileSites() {
    if(this.state.profileData.sites) {
      return _map(this.state.profileData.sites, (site, index) => {
        if (site !== undefined) {
          // site.id = index;
          return (
            <li key={index}>
              <ProfileSite
              siteDetails={site}
              editing={this.state.editing}
              stageProfileEdits = {this.stageProfileEdits.bind(this)} />
            </li>
          );
        }
      });
    }
  }

  renderProfileGroups() {
    if(this.state.profileData.groups) {
      return (
      <ProfileGroups
      selectedGroups={this.state.profileData.groups}
      editing={this.state.editing}
      stageProfileEdits = {this.stageProfileEdits.bind(this)} />)
    }
  }

  renderProfileAdminOptions() {
    if (auth.getCookie('ac') === '1' && this.state.editing === 1 && this.state.profileData.user) {
      return(
        <ProfileAdminOptions
          stageProfileEdits = {this.stageProfileEdits.bind(this)}
          permission = {this.state.profileData.user.permission}
          public = {this.state.profileData.user.public}
          userid = {this.state.profileData.user.id}
          />
      )
    }
  }


  //In saveUserProfile, the api accepts post requests in array format for
  //data.userInfo and data.sites.
  //it's easier to work worth and then convert it to an array before saving.
  saveUserProfile(callback) {
    var url = '/db/users/user/' + this.props.params.user;
    var data = this.stagedProfileEdits;
    data.userInfo = _map(data.userInfo, function(val){return val});
    data.sites = _map(data.sites, function(val){return val});
    RestHandler.Post(url, data, (err, res) => {
      if (err) {return err;}
      callback(res);
    });
  }

  profileEditButtonTapped() {
    if(this.state.editing) {
      this.setState({
        editing: 0,
      });
    } else {
      this.setState({ editing: 1 });
    }
  }

  profileSaveButtonTapped() {
    this.saveUserProfile( () => {
      this.stagedProfileEdits.sites = {};
      this.stagedProfileEdits.userInfo = {};
      this.setState({ editing: 0 });
      this.getUserProfile(this.props.params.user);
    });
  }

  // stageProfileEdits is passed into child components where the value can be
  // edited and saved. It updates the stagedProfileEdits property, which will be
  // saved when you call saveUserProfile()
  stageProfileEdits(callback) {
    callback(this.stagedProfileEdits);
    // console.log("permission: ", this.stagedProfileEdits.user.permission);
    // console.log("public: ", this.stagedProfileEdits.user.public);
  }

  render() {
    var {name, image, id} = (this.state.profileData.user) ? this.state.profileData.user : ''
    var groups = this.state.profileData.groups;
    var profileSidebar = groups ? <ProfileSidebar groups={groups} /> : <div></div>;
    if (this.state.profileData.user && (auth.getCookie('ac') === '1' || this.state.profileData.user.public === 1)) {
      return (
        <Row>
          <Col xs={12} sm={9} xl={10} className='float-right'>
            <div className='section profile-main'>
              <Row>
                <Col xs={12} sm={5} md={4}>
                  <ProfileImage
                    src={image}
                    profileUserId={id}
                    editing={this.state.editing} />
                </Col>
                <Col xs={12} sm={7} md={8}>
                  <ProfileEditButton
                    profilesUserId = {id}
                    editing = {this.state.editing}
                    profileEditButtonTapped = {this.profileEditButtonTapped.bind(this)}
                    profileSaveButtonTapped = {this.profileSaveButtonTapped.bind(this)} />
                  <h2>{name}</h2>
                  {this.renderProfileGroups()}

                  <ul>
                    {this.renderProfileSites()}
                  </ul>
                  {this.renderProfileAdminOptions()}
                </Col>
              </Row>
            </div>
            <div className = 'section profile-bio'>
              {this.renderProfileFields()}
              <ProfileEditButton
                profilesUserId = {id}
                editing = {this.state.editing}
                hideEditButton = {true}
                profileEditButtonTapped = {this.profileEditButtonTapped.bind(this)}
                profileSaveButtonTapped = {this.profileSaveButtonTapped.bind(this)} />
            </div>
          </Col>
          <Col xs={12} sm={3} xl={2}>
            {profileSidebar}
          </Col>
        </Row>

      );
    } else {
      return (
        <div>
        Sorry, this user's profile is not publicly visible
        </div>
      );
    }
  }
}

module.exports = Profile;
