import React from 'react'
import { Input } from 'react-bootstrap';


class Bio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount() {
    this.setState({value: this.props.bioDetails.value})
  }

  handleFormChange () {
    this.setState({value: this.refs.input.refs.input.value});
  }
  renderBioDetails() {
    var editing = this.props.editing;
    var {title} = this.props.bioDetails
    var value = this.state.value;

    if(!editing) {
      return (
        <div key={title}>
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
      );
    } else {
      return (
        <div key={title}>
          <h3>{title}</h3>
          <Input type="textarea"
            value={value}
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
