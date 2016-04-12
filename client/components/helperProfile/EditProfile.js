import React from 'react'

class Edit extends React.Component {
  constructor (props) {
    super(props);
  }

  handleChange() {

  }

  editBio() {
    var bio = [];
    for (var title in this.props.bioDetails) {
      var obj = {};
      obj.title = title;
      obj.content = this.props.bioDetails[title];
      bio.push(
        <div key={obj.title}>
          <h3>{obj.title}</h3>
          <textarea type="text" onChange={this.handleChange} value={obj.content} />
        </div>
      );
    }

    return bio;
  }

  render() {

    return (
      <div>{this.editBio()}</div>
    );
  }
}

module.exports = Edit;