import React from 'react'
import { Button } from 'react-bootstrap';


class ProfileEditButton extends React.Component {
  constructor(props) {
    super(props);
  }

  generateButtons() {

    if(this.props.editing) {
      return(
        <Button onClick={this.props.handleEditProfile}>
          Edit Profile
        </Button>
      )
    } else {
      return(
        <Button onClick={this.props.handleEditProfile}>
          Edit
        </Button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.generateButtons()}
      </div>
    );
  }
}

module.exports = ProfileEditButton;
