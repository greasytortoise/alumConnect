import React from 'react'
import { Input, Button } from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'

class EditGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value.group_name,
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
      var url = '/db/groups/group/' + this.props.value.id;
      var data = {
        group_name: this.state.value
      };

      RestHandler.Post(url, data, (err, res) => {
        if (err) {return err;}
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
      <div key={this.props.value.id}>
        <Input type="text" disabled={this.state.disabled} buttonAfter={innerButton} value={this.state.value}
          ref="input" onChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }
}

module.exports = EditGroup;
