import React from 'react'
import { Input } from 'react-bootstrap';


class ProfileField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount() {
    this.setState({value: this.props.fieldDetails.value})
  }

  handleFormChange () {
    var {title, id} = this.props.fieldDetails
    var formValue = this.refs.input.refs.input.value;

    this.setState({value: formValue});
    this.props.stageProfileEdits((editedObject) => {
      editedObject[id] = {
        id: id,
        title: title,
        value: formValue
      }
    });
  }
  renderProfileField() {
    var editing = this.props.editing;
    var {title, id} = this.props.fieldDetails
    var value = this.state.value;
    var formattedValue = value.split('\n').map(function(paragraph) {
      return (<span>{paragraph}<br/></span>)
    });

    if(!editing) {
      return (
        <div key={id}>
          <h3>{title}</h3>
          <p>{formattedValue}</p>
        </div>
      );
    } else {
      return (
        <div key={id}>
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
      this.renderProfileField()
    );
  }
}

module.exports = ProfileField;
