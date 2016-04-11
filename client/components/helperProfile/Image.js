import React from 'react'

class Image extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      edit: 0
    }
  }

  render() {
    return (
      <img src={this.props.image} className="photo" />
    );
  }
}

module.exports = Image;