import React from 'react'
import { Input, Button, ListGroupItem } from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
var auth = require('../../../util/authHelpers.js');

class EditSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site_name: this.props.value.site_name,
      url: this.props.value.base_url,
      disabled: true
    }
  }

  handleInputChange () {
    this.setState({
      url: this.refs.input.getValue(),
      disabled: false
    });
  }

  handleClick() {
    if (this.state.disabled) {
      this.setState({
        disabled: false
      });
    } else {
      var url = '/db/sites/site/' + this.props.value.id;
      var data = {
        site_name: this.state.site_name,
        base_url: this.state.url, 
        token: auth.getToken()
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
        <Input type="text" disabled={this.state.disabled} label={this.state.site_name}
          buttonAfter={innerButton} value={this.state.url} 
          ref="input" onChange={this.handleInputChange.bind(this)} />
      </div>
    );
  }
}

module.exports = EditSite;
