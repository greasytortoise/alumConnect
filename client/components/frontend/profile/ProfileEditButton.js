import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap';


class ProfileEditButton extends React.Component {
  constructor(props) {
    super(props);
  }

  generateButtons() {

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
  }

  render() {
    return (
        this.generateButtons()
    );
  }
}

module.exports = ProfileEditButton;
