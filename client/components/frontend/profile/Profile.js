import React from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileImage from './ProfileImage'
import ProfileField from './ProfileField'
import ProfileSite from './ProfileSite'
import ProfileGroups from './ProfileGroups'
import ProfileAdminOptions from './ProfileAdminOptions'
import ProfileEditButton from './ProfileEditButton'
import request from 'superagent'
import auth from '../../../util/authHelpers.js'
import RestHandler from '../../../util/RestHandler'
import {findDOMNode} from 'react-dom'
import { InputGroup, ControlLabel, FormControl, Select, Button, Grid,  Row, Col, Image, Modal} from 'react-bootstrap';
var _map = require('lodash/map');
var _find = require('lodash/find');
var _clone = require('lodash/clone')


class Profile extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      profileData: {},
      editing: 0,
      hasAdminAccess: false,
      userIsHidden: false
    };

    //if profile is edited / saved. sites and userInfo into will
    // be converted to an arr of objects -- see saveUserProfile()
    this.stagedProfileEdits = {user: {}, sites: {}, userInfo:{}};

  }

  componentWillReceiveProps(nextProps) {
    //For when the route changes from something like /users/3 to /users/6
    //When clicking on the sidebar url
    if(nextProps) {
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
      this.spliceFilledOutFieldsIntoAvailableFields(res.body, 'userInfo', '/db/fields', (profileData) => {
        this.spliceFilledOutFieldsIntoAvailableFields(profileData, 'sites', '/db/sites', (profileData) => {
          this.stagedProfileEdits.user = profileData.user;
          this.stagedProfileEdits.groups = _map(profileData.groups, (key, val) => val).join(',')
          this.setState({
            profileData: profileData,
            public: profileData.user.public === 1 ? false : true,
            permission: profileData.user.permission === 1 ? true : false,
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
        site.id = index;
        return (
          <li key={index}>
            <ProfileSite
            siteDetails={site}
            editing={this.state.editing}
            stageProfileEdits = {this.stageProfileEdits.bind(this)} />
          </li>
        );
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



  //In saveUserProfile, the api accepts post requests in array format for
  //data.userInfo and data.sites.
  //it's easier to work worth and then convert it to an array before saving.
  saveUserProfile(callback) {
    var url = '/db/users/user/' + this.props.params.user;
    this.stagedProfileEdits.user.public = this.state.public === true ? 0 : 1;
    this.stagedProfileEdits.user.permission = this.state.permission === true ? 1 : 0;
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

  setDeleteState(e) {
    e.preventDefault();
    this.setState({
      showDelete: true,
    });
  }

  resetDeleteState() {
    this.setState({
      showDelete: false,
    });
  }

  deleteUser(e) {
    var that = this;
    e.preventDefault();
    request
      .delete('/dashboard/db/users/user/' + that.state.profileData.user.id)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          console.log('User deleted');
          that.resetDeleteState();
          window.location.href = '/';
        }
      });
  }

  closePopup() {
    this.setState({ showDelete: false });
  }

  // stageProfileEdits is passed into child components where the value can be
  // edited and saved. It updates the stagedProfileEdits property, which will be
  // saved when you call saveUserProfile()
  stageProfileEdits(callback) {
    callback(this.stagedProfileEdits);
    // console.log(this.stagedProfileEdits);
  }

  render() {
    var adminView;
    if (auth.getCookie('ac') === '1' && this.state.editing === 1) {
      adminView = <ProfileAdminOptions />;
    }
    var {name, image, id} = (this.state.profileData.user) ? this.state.profileData.user : ''
    var groups = this.state.profileData.groups;
    var profileSidebar = groups ? <ProfileSidebar groups={groups} /> : <div></div>;

    if (auth.getCookie('ac') === '1' || this.state.profileData.user.public === 1) {
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
                  {adminView}
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




          <Modal
            show={this.state.showDelete}
            onHide={this.closePopup.bind(this)}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this user?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
              <Button bsStyle="danger" onClick={this.deleteUser.bind(this)}>Delete</Button>
            </Modal.Footer>
          </Modal>


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
