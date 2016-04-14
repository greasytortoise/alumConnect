import React from 'react'
import {Input, ButtonInput, ListGroup, ListGroupItem} from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'
import request from 'superagent';

class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: []
      // group_name: ''
    }
  }

  componentDidMount() {
    RestHandler.Get('/db/sites', (err, res) => {
      this.setState({sites: res.body})
    });
  }

  renderSites() {
    return this.state.sites.map(function(site) {
      var {id, site_name, base_url} = site;
      return (
        <ListGroupItem key={id} header="site_name">
          {base_url}
        </ListGroupItem>
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var site = this.refs.site.getValue();
    var url = this.refs.url.getValue();

    var siteInfo = {
      site_name: site,
      base_url: url
    };

    RestHandler.Post('/db/sites', siteInfo, (err, res) => {
      if (err) {return err;}
      this.setState({sites: this.state.sites.concat(res.body)})
    });

    this.clearForm();
  }

  clearForm() {
    const fields = ['site', 'url'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
    });
  }

  render() {
    return (
      <div>
        <h4>Sites</h4>
        <ListGroup>
          {this.renderSites()}
        </ListGroup>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <Input type="text" label="Add Site" 
            placeholder="Enter site name" ref="site" />
          <Input type="text"  ref="url" 
            placeholder="Enter site url  example: https://www.github.com/" />

          <ButtonInput type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = Sites;