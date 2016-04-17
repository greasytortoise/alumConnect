import React from 'react';
import { Input, Button } from 'react-bootstrap';
import RestHandler from '../../../util/RestHandler';
var auth = require('../../../util/authHelpers.js');

class EditProfileField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value.title,
      disabled: true
    }
  }

  handleInputChange () {
    this.setState({
      value: this.refs.input.getValue(),
      disabled: false
    });
  }

  handleClick() {
    if (this.state.disabled) {
      this.setState({
        disabled: false
      });
    } else {
      var url = '/db/fields/field/' + this.props.value.id;
      var data = {
        title: this.state.value
      };

      RestHandler.Post(url, data, (err, res) => {
        if (err) {return err;}
        console.log('res', res.body);
      });

      this.setState({
        disabled: true
      });
    }
  }

  render() {
    var button = '';
    this.state.disabled ? button = 'edit' : button = 'save';
    const innerButton = <Button onClick={this.handleClick.bind(this)}>{button}</Button>;
    return (
      <div>
        <Input type="text" disabled={this.state.disabled} buttonAfter={innerButton} value={this.state.value} 
          ref="input" onChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }
}

module.exports = EditProfileField;