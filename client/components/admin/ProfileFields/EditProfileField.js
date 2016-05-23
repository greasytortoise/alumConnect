import React from 'react'
import { InputGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'

class EditProfileField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: this.props.field.title,
      disabled: true
    }
  }

  handleInputChange (e) {
    this.setState({
      fieldName: e.target.value,
      disabled: false
    });
  }

  handleClick() {
    if (this.state.disabled) {
      this.setState({
        disabled: false
      });
    } else {
      var url = '/db/fields/field/' + this.props.field.id;
      var data = {
        title: this.state.fieldName
      };

      RestHandler.Post(url, data, (err, res) => {
        if (err) {return err;}
        this.setState({
          disabled: true
        });
      });
    }
  }

  render() {
    var buttonText = this.state.disabled ? 'edit' : 'save';
    return (
      <div key={this.props.field.id}>
        <InputGroup className="input-with-dropdown">
          <InputGroup.Addon>
            <Button onClick={this.handleClick.bind(this)}>{buttonText}</Button>
          </InputGroup.Addon>
        <FormControl
          type="text"
          disabled={this.state.disabled}
          value={this.state.fieldName}
          ref="input"
          onChange={this.handleInputChange.bind(this)} />
        </InputGroup>
      </div>
    );
  }
}

module.exports = EditProfileField;
