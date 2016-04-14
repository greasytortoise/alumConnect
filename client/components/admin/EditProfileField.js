import React from 'react'
import { Input, Button } from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'

class EditProfileField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value.title,
      disabled: true,
      button: "Edit"
    }
  }

  handleChange () {
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

      var url = '/db/fields/field/' + this.props.value.id;
      var data = {
        title: this.state.value
      };

      RestHandler.Post(url, data, (err, res) => {
        if (err) {return err;}
        console.log('res', res.body);
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