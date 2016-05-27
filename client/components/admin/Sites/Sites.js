import React from 'react'
import {FormGroup, Modal, Col, Row, FormControl, Button, ListGroup, ListGroupItem, ControlLabel} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import EditSite from './EditSite.js'
import $ from 'jquery';
import request from 'superagent';

class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      error: false,
      isSaving: false,
      newSiteName: '',
      newSiteUrl: '',
      showDelete: false,
      toBeDeleted: {
        id: null,
      },
    }
  }

  componentDidMount() {
    RestHandler.Get('/db/sites', (err, res) => {
      this.setState({sites: res.body})
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
      isSaving: false,
    });
  }

  getDeleteLink(id) {
    var data = JSON.stringify(id);
    return (
      <div key={id} className="deleteLink3" data={data}
        onClick={this.setDeleteState.bind(this)}
      >
      </div>
    );
  }

  setDeleteState(e) {
    var data = JSON.parse($(e.target).attr('data'));
    e.preventDefault();
    this.setState({ toBeDeleted: {
      id: data,
    },
    showDelete: true });
  }

  resetDeleteState() {
    this.setState({ toBeDeleted: {
      id: null,
    },
    showDelete: false });
  }

  deleteSite(e) {
    var that = this;
    e.preventDefault();
    request
      .delete('/db/sites/site/' + that.state.toBeDeleted.id)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          console.log('Site deleted');
          for (var i = 0; i < that.state.sites.length; i++) {
            if (that.state.sites[i].id == that.state.toBeDeleted.id) {
              that.state.sites.splice(i, 1);
              break;
            }
          }
          that.setState({ key: Math.random() });
          that.resetDeleteState();
        }
      });
  }


  closePopup() {
    this.setState({ showDelete: false });
  }

  renderSites() {
    var that = this;
    return this.state.sites.map(function(site) {
      var {id, site_name, base_url} = site;
      return (
        <Row>
          <Col xs={11}>
            <EditSite key={id} site={site} />
          </Col>
          <Col xs={1}>
            {that.getDeleteLink(id)}
          </Col>
        </Row>
      );
    });
  }

  render() {

    return (
      <div>
        <h3 className="dashboard-title">Sites</h3>
        <Modal
          show={this.state.showDelete}
          onHide={this.closePopup.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Delete Site</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this site?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deleteSite.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>
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
            value={this.state.newSiteUrl}
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
