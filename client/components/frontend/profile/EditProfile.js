import React from 'react'
import EditBioEntry from './EditBioEntry.js'
import { Button } from 'react-bootstrap';

class Edit extends React.Component {
  constructor (props) {
    super(props);

  }

  saveAndContinue() {

  }

  editBio() {
    var bio = [];
    for (var i = 0; i < this.props.bioDetails.length; i++) {
      var obj = this.props.bioDetails[i];
      bio.push(
        <div key={obj.title}>
          <EditBioEntry bio={obj} />
        </div>
      );
    }

    return bio;
  }

  render() {
    console.log('edit bio', this.props);
    return (
      <div>
        <img src={this.props.image} className="photo" />
        <div>{this.editBio()}</div>
        <Button onClick={this.saveAndContinue}>Save and Continue</Button>
      </div>
    );
  }
}

module.exports = Edit;
