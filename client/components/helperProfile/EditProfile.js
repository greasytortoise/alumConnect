import React from 'react'
import EditBioEntry from './EditBioEntry.js'

class Edit extends React.Component {
  constructor (props) {
    super(props);

  }

  saveAndContinue() {
    
  }

  editBio() {
    var bio = [];
    for (var title in this.props.bioDetails) {
      var obj = {};
      obj.title = title;
      obj.content = this.props.bioDetails[title];
      bio.push(
        <div key={obj.title}>
          <EditBioEntry bio={obj} />
        </div>
      );
    }

    return bio;
  }

  render() {

    return (
      <div>
        <img src={this.props.image} className="photo" />
        <div>{this.editBio()}</div>
        <button onClick={this.saveAndContinue}>Save and Continue</button>
      </div>
    );
  }
}

module.exports = Edit;