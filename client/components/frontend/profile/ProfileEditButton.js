import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap';
import auth from '../../../util/authHelpers.js'


class ProfileEditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: -1,
      permission: 0
    }
  }

  componentDidMount() {
    this.getLoggedInUserData();
  }

  getLoggedInUserData() {
    //gets the authentication token from util/authHelpers.js
    //and retrieves permission and user id
    // auth.parseJwtAsync((parsedToken) => {
    //   if(parsedToken) {
    //     this.setState({
    //       loggedInUserId: parsedToken.iss,
    //       permission: parsedToken.perm
    //     });
    //   }
    // });
  }


  generateButtons() {
    if(this.state.permission === 1 || this.props.profilesUserId === this.state.loggedInUserId) {
      if(this.props.editing) {
        return (
          <ButtonToolbar>
            <Button onClick={this.props.profileSaveButtonTapped} bsStyle="primary">Save Changes</Button>
            <Button onClick={this.props.profileEditButtonTapped}>Cancel</Button>
          </ButtonToolbar>
        )
      } else {
        return this.props.hideEditButton
          ? <div></div>
          : <ButtonToolbar><Button onClick={this.props.profileEditButtonTapped}>Edit Profile</Button></ButtonToolbar>
      }
    } else {
      return(<div></div>)
    }

  }

  render() {
    return (
        this.generateButtons()
    );
  }
}

module.exports = ProfileEditButton;
