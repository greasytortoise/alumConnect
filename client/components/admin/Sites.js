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
      var {id, site_name} = site;
      return (
        <ListGroupItem key={id}>{site_name}</ListGroupItem>
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var site = this.refs.site.refs.input.value;
    request('POST', '/db/sites')
      .send({site_name: site})
      .end(function(err, res){
        if (err) {
          console.error(err);
        } //rerender all groups on success
        // this.setState({
        //   groups: res.body
        // });
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

          <ButtonInput type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = Sites;