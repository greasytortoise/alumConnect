import React from 'react'
import { Input } from 'react-bootstrap';


class Bio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {content: ''};
  }

  componentDidMount() {
    console.log('???');
    this.setState({
      content: this.props.bioDetails.content
    })
  }

  handleFormChange () {
    this.setState({content: this.refs.input.refs.input.value});
  }


  renderBioDetails() {

    var {title} = this.props.bioDetails
    var editing = this.props.editing;
    var content = this.state.content;


    if(!editing) {
      return (
        <div key={title}>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      );
    }

    else {
      return (
        <div key={title}>
          <h3>{title}</h3>
          <Input type="textarea"
            value={content}
            ref='input'
            onChange={this.handleFormChange.bind(this)} />
        </div>
      );
    }
  }

  render() {
    return (
      <div>{this.renderBioDetails()}</div>
    );
  }
}

module.exports = Bio;
