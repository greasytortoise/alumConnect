import React from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileImage from './ProfileImage'
import ProfileField from './ProfileField'
import ProfileSite from './ProfileSite'
import request from 'superagent'
import ProfileGroups from './ProfileGroups'
import ProfileEditButton from './ProfileEditButton'
import auth from '../../../util/authHelpers.js'
import RestHandler from '../../../util/RestHandler'
import {findDOMNode} from 'react-dom'
import { InputGroup, ControlLabel, FormControl, Radio, Select, Button, Row, Col, Image, Modal} from 'react-bootstrap';
var _map = require('lodash/map');
var _find = require('lodash/find');
var _clone = require('lodash/clone')


class Profile extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      profileData: {},
      editing: 0,
      showDelete: false,

    };

    //if profile is edited / saved. sites and userInfo into will
    // be converted to an arr of objects -- see saveUserProfile()
    this.profileEdits = {
      user: {},
      sites: {},
      userInfo:{},

    };

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
  // 3. sets the state to profileData, which renders most of the page!
  // 4. initializes this.profileEdits.user to currently vieweing user
  getUserProfile(userId) {
    var url = '/db/users/user/' + userId;
    RestHandler.Get(url, (err, res) => {

      this.spliceFilledOutFieldsIntoAvailableFields(res.body, 'userInfo', '/db/fields', (profileData) => {
        this.spliceFilledOutFieldsIntoAvailableFields(profileData, 'sites', '/db/sites', (profileData) => {
          this.profileEdits.user = res.body.user
          console.log(profileData);
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
      var newObjectWithAllFields = _map(availableFields,(availableField) => {
        //sets available field to filled out field if it exists
        var found = _find(filledOutFields, (field) => field.id === availableField.id);
        return found ? found : availableField;
      });
      profileData[objectToUpdate] = newObjectWithAllFields
      callback(profileData)
    });
  }



  renderProfileFields() {
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

  renderProfileSites() {
    if(this.state.profileData.sites) {
      return this.state.profileData.sites.map((site, index) => {
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
  //data.userInfo and data.sites. I set them up as an object initially because
  //it's easier to work worth and then convert it to an array before saving.
  saveUserProfile(callback) {
    console.log(this.profileEdits)
    // this.profileEdits.user.public = this.state.newpublic;
    // this.profileEdits.user.permission = this.state.newpermission;
    var url = '/db/users/user/' + this.props.params.user;
    var data = this.profileEdits;
    data.userInfo = _map(data.userInfo, function(val){return val});
    data.sites = _map(data.sites, function(val){return val});
    RestHandler.Post(url, data, (err, res) => {
      console.log(data);
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
      this.profileEdits = {
        user: this.profileEdits.user,
        sites: {},
        userInfo: {},
        public: null,
        permission: null,
      };
    });
  }

  getAdminEdits() {
    const that = this;
    return (
      <div>
        <InputGroup ref="permissionselect" controlId="formControlsSelect">
          <ControlLabel>User Permissions?</ControlLabel>
          <FormControl onChange={this.setPermChange.bind(that)} ref="permgroup" componentClass="select" placeholder="select"  >
            <option ref="notselected" value="...">...</option>
            <option ref="selectAdmin" value="admin">Admin</option>
            <option ref="selectuser" value="user">Standard</option>
          </FormControl>
        </InputGroup>
        <InputGroup ref="visselect" controlId="formControlsSelect">
          <ControlLabel>User publicly visible?</ControlLabel>
          <FormControl onChange={this.setVisibilityChange.bind(that)} ref="visgroup" componentClass="select" placeholder="select"  >
            <option ref="notselected" value="...">...</option>
            <option ref="selectyes" value="Yes">Yes</option>
            <option ref="selectno" value="No">No</option>
          </FormControl>
        </InputGroup>
        <Row>
          <ControlLabel>Delete user</ControlLabel>
        </Row>
        <Button onClick={this.setDeleteState.bind(this)} bsStyle="danger">Delete</Button>

      </div>
    );
  }
  
  setVisibilityChange(e) {
    const data = e.target.value;

    if (data === 'Yes') {
      this.profileEdits.user.public = 1;
    } else if (data === 'No') {
      this.profileEdits.user.public = 0;
    }
  }

  setPermChange(e) {
    const data = e.target.value;

    if (data === 'admin') {
      this.profileEdits.user.permission = 1;
    } else if (data === 'user') {
      this.profileEdits.user.permission = 0;
    }
  }

  setDeleteState(e) {
    console.log('state', this.state)
    console.log('refs', this.refs)
    console.log('props', this.props)
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
          window.location.href = '/dashboard';
        }
      });
  }

  closePopup() {
    this.setState({ showDelete: false });
  }

  // stageProfileEdits is passed into child components where the value can be
  // edited and saved. It updateds the profileEdits property, which will be
  // saved when you call saveUserProfile()

  stageProfileEdits(callback) {
    callback(this.profileEdits);
    // //uncomment to see what's being staged when you edit a field
    // console.log(this.profileEdits);
  }

  render() {
    var adminView;
    if (auth.getCookie('ac') === '1' && this.state.editing === 1) {
      adminView = this.getAdminEdits();
    }
    var name, image, groups, id = ''
    if (this.state.profileData.user) {
      var {name, image, id} = this.state.profileData.user
    }
    var groups = this.state.profileData.groups;
    var profileSidebar;
    if(groups) {
      profileSidebar = <ProfileSidebar groups={groups} />;
    }

    if (auth.getCookie('ac') === '1' || this.state.profileData.user.public === 1) {

      return (
        <Row>
          <Col xs={12} sm={9} xl={10} className='float-right'>
            <div className='section profile-main'>
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
              <Row>
                <Col xs={12} sm={5} md={4}>
                  <ProfileImage
                    src={image}
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
                    {adminView}
                  </ul>
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
