import React from 'react'

class Bio extends React.Component {
  constructor(props) {
    super(props); 
  }

  bio() {
    var bio = [];
    for (var i = 0; i < this.props.bioDetails.length; i++) {
      var obj = this.props.bioDetails[i];
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


      
