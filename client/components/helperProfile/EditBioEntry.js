import React from 'react'

class EditBioEntry extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: this.props.bio.title,
      content: this.props.bio.content
    }
  }

  handleChange () {
    this.setState({content: this.refs.val.value});
  }

  render () {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <textarea ref="val" onChange={this.handleChange.bind(this)} value={this.state.content} />
      </div>
    );
  }
}

module.exports = EditBioEntry;