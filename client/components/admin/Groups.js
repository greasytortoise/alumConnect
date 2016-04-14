import React from 'react'
import {Input, ButtonInput, ListGroup, ListGroupItem} from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'

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
    var group = this.refs.group.getValue();
    var groupInfo = {
      group_name: group
    };

    RestHandler.Post('/db/groups', groupInfo, (err, res) => {
      if (err) {return err;}
      this.setState({groups: this.state.groups.concat(res.body)})
    });

    this.clearForm();
  }

  clearForm() {
    const fields = ['group'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
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