import React from 'react'
import {FormGroup, FormControl, Button, ListGroup, ListGroupItem, ControlLabel} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import EditSite from './EditSite.js'

class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      error: false,
      isSaving: false,
      newSiteName: '',
      newSiteUrl: '',
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
        <EditSite key={id} site={site} />
      );
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({isSaving: true});
    var site = this.state.newSiteName;
    var url = this.state.newSiteUrl;

    var siteInfo = {
      site_name: site,
      base_url: url
    };

    if (site === '' || url === '') {
      this.setState({
        error: true,
        isSaving: false
      });

    } else {
      RestHandler.Post('/db/sites', siteInfo, (err, res) => {
        if (err) {
          console.error(err);
          this.setState({
            error: true,
            isSaving: false
          });
        } else if(res.status === 201) {
          console.log('RESponse: ', res);
          setTimeout(() => {
            this.setState({
              isSaving: false,
              sites: this.state.sites.concat(res.body),
              newSiteName: '',
              newSiteUrl: '',
            });
          }, 200);
        }
      });

    }


  }

  clearForm() {
    this.setState({
      is
    })
  }

  render() {

    return (
      <div>
        <h3 className="dashboard-title">Sites</h3>
        <ListGroup>
          {this.renderSites()}
        </ListGroup>
        <FormGroup>
          <ControlLabel>Add a new site</ControlLabel>

          <FormControl
            type="text"
            placeholder="Enter site name"
            value={this.state.newSiteName}
            onChange={(e) =>{this.setState({newSiteName: e.target.value})}} />
          <FormControl
            type="text"
            placeholder="Enter site url example: https://www.github.com/"
            value={this.state.newSiteName}
            onChange={(e) =>{this.setState({newSiteUrl: e.target.value})}} />

          <Button
            type="submit"
            bsStyle="primary"
            disabled={this.state.isSaving}
            onClick={this.handleSubmit.bind(this)}>
          {this.state.isSaving ? 'Saving...' : 'Submit'}
          </Button>
        </FormGroup>

        {this.state.error && (
          <span>Enter a unique Site Name and URL.</span>
        )}

      </div>
    );
  }
}

module.exports = Sites;
