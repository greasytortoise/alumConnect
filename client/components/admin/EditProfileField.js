import React from 'react'
import { Input, Button } from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'

class EditProfileField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      disabled: true,
      button: "Edit"
    }
  }

  handleChange () {
    console.log(this.refs.input.getValue());  
    this.setState({
      value: this.refs.input.getValue(),
      disabled: false
    });
  }

  handleClick() {

    if (this.state.button === 'Edit') {
      this.setState({
        button: "Save",
        disabled: false
      });
    } else if (this.state.button === 'Save') {
      var data = {
        field: this.state.value
      };

      RestHandler.Post('/db/fields', data, (err, res) => {
        if (err) {return err;}
      });

      this.setState({
        disabled: true,
        button: "Edit"
      });
    }

  }

  render() {
    const innerButton = <Button onClick={this.handleClick.bind(this)}>{this.state.button}</Button>;
    return (
      <div>
        <Input type="text" disabled={this.state.disabled} buttonAfter={innerButton} value={this.state.value} 
          ref="input" onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

module.exports = EditProfileField;