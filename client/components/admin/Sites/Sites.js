import React from 'react'
import {Input, ButtonInput, ListGroup, ListGroupItem} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import EditSite from './EditSite.js'

class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      error: false,
      isSaving: false
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
        <EditSite key={id} value={site} />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isSaving: true});
    var site = this.refs.site.getValue();
    var url = this.refs.url.getValue();

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
            this.setState({isSaving: false});
            this.setState({sites: this.state.sites.concat(res.body)});
            this.clearForm();
          }, 200);
        }
      });

    }


  }

  clearForm() {
    const fields = ['site', 'url'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
    });
  }

  render() {
    var isSaving = this.state.isSaving;

    return (
      <div>
        <h3 className="dashboard-title">Sites</h3>
        <ListGroup>
          {this.renderSites()}
        </ListGroup>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <Input type="text" label="Add Site"
            placeholder="Enter site name" ref="site" />
          <Input type="text"  ref="url"
            placeholder="Enter site url  example: https://www.github.com/" />

          <ButtonInput
            bsStyle="primary"
            disabled={isSaving}
            type="submit"
            value={isSaving ? `Saving...` : 'Submit'} />
        </form>

        {this.state.error && (
          <span>Enter a unique Site Name and URL.</span>
        )}

      </div>
    );
  }
}

module.exports = Sites;
