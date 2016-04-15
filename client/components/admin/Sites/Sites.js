import React from 'react'
import {Input, ButtonInput, ListGroup, ListGroupItem} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import EditSite from './EditSite.js'

class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: []
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
        <EditSite value={site} />
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