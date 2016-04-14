import React from 'react'
import {Input, ButtonInput, ListGroup, ListGroupItem} from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'
import request from 'superagent';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      group_name: ''
    }
  }

  componentDidMount() {
    RestHandler.Get('/db/groups', (err, res) => {
      this.setState({groups: res.body})
    });
  }

  renderGroups() {
    return this.state.groups.map(function(group) {
      var {id, group_name} = group;
      return (
        <ListGroupItem key={id}>{group_name}</ListGroupItem>
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var group = this.refs.group.refs.input.value;
    request('POST', '/db/groups')
      .send({group_name: group})
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
        <h4>Groups</h4>
        <ListGroup>
          {this.renderGroups()}
        </ListGroup>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Input type="text" label="Add Group" 
            placeholder="Enter group name" ref="group" />

          <ButtonInput type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = Groups;