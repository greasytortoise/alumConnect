import React from 'react'
import { InputGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'

class EditSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site_name: this.props.site.site_name,
      url: this.props.site.base_url,
      disabled: true
    }
  }

  handleInputChange (e) {
    this.setState({
      url: e.target.value,
      disabled: false
    });
  }

  handleClick() {
    if (this.state.disabled) {
      this.setState({
        disabled: false
      });
    } else {
      var url = '/db/sites/site/' + this.props.site.id;
      var data = {
        site_name: this.state.site_name,
        base_url: this.state.url,
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
      <div key={this.props.site.id}>
        <ControlLabel>{this.state.site_name}</ControlLabel>
        <InputGroup className="input-with-dropdown">
          <InputGroup.Addon>
            <Button onClick={this.handleClick.bind(this)}>{buttonText}</Button>
          </InputGroup.Addon>
          <FormControl type="text"
            disabled={this.state.disabled}
            value={this.state.url}
            ref="input"
            onChange={this.handleInputChange.bind(this)} />
        </InputGroup>
      </div>
    );
  }
}

module.exports = EditSite;
