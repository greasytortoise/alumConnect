import React from 'react'

class Bio extends React.Component {
  constructor(props) {
    super(props); 
  }

  bio() {
    var bio = [];
    for (var title in this.props.bioDetails) {
      var obj = {};
      obj.title = title;
      obj.content = this.props.bioDetails[title];
      bio.push(
        <div key={obj.title}>
            <h3>{obj.title}</h3>
            <p>{obj.content}</p>
        </div>
      );
    }

    return bio;
  }

  render() {

    return (
      <div>{this.bio()}</div>
    );
  }
}

module.exports = Bio;


      
