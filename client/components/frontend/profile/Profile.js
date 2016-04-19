import React from 'react'
import ProfileField from './ProfileField'
import ProfileSite from './ProfileSite'
import ProfileEditButton from './ProfileEditButton'
import ProfileSidebar from './ProfileSidebar'

import RestHandler from '../../../util/RestHandler'
import { Button, Row, Col, Image} from 'react-bootstrap';
var _map = require('lodash/map');
var _find = require('lodash/find');
var _clone = require('lodash/clone')


class Profile extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      profileData: {},
      editing: 0
    };

    //if profile is edited / saved. sites and userInfo into will
    // be converted to an arr of objects -- see saveUserProfile()
    this.profileEdits = {
      user: {},
      sites: {},
      userInfo:{}
    }
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

  componentDidMount() {
    this.getUserProfile(this.props.params.user);
  }


  //getUserProfile does a few things:
  // 1. Gets the users profile (but doesn't update the state yet)
  // 2. Run functions to get all the available fields on the site and splice in
  //    the filled out fields to a profileData object
  // 3. set the state to profileData, which renders most of the page!
  // 4. Also initialize this.profileEdits.user incase something is edited

  getUserProfile(userId) {
    var url = '/db/users/user/' + userId;
    RestHandler.Get(url, (err, res) => {

      this.spliceFilledOutFieldsIntoAvailableFields(res.body, 'userInfo', '/db/fields', (profileData) => {
        this.spliceFilledOutFieldsIntoAvailableFields(profileData, 'sites', '/db/sites', (profileData) => {
          this.profileEdits.user = res.body.user
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



  //In saveUserProfile, the api accepts post requests in array format for
  //data.userInfo and data.sites. I set them up as an object initially because
  //it's easier to work worth and then convert it to an array before saving.
  saveUserProfile(callback) {
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
        userInfo:{}
      }
    });
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
    var username, image, group, group_id, id = ''
    if (this.state.profileData.user) {
      var {username, image, group, group_id, id} = this.state.profileData.user
    }
    var profileSidebar;
    if(group_id) {
      profileSidebar = <ProfileSidebar groupId={group_id} group={group} />;
    }

    return (
      <Row>
        <Col xs={12} sm={9} xl={10} className='float-right'>
          <div className='section profile-main'>
            <Row>
              <Col xs={12} sm={5} md={4}>
                <Image src={image} responsive />
              </Col>
              <Col xs={12} sm={7} md={8}>
                <ProfileEditButton
                  profilesUserId = {id}
                  editing = {this.state.editing}
                  profileEditButtonTapped = {this.profileEditButtonTapped.bind(this)}
                  profileSaveButtonTapped = {this.profileSaveButtonTapped.bind(this)} />
                <h2>{username}</h2>
                <h3>Groups: <a href="#">{group}</a></h3>
                <ul>
                  {this.renderProfileSites()}
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
  }
}

module.exports = Profile;
