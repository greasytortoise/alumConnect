import React from 'react'
import {Input, ButtonInput} from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'

class AddGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: RestHandler.getGroups(),
      group_name: ''
    }
  }

  handleFormChange() {
    this.setState({
      group_name: this.refs.group.refs.input.value
    });
    console.log(this.state.groups);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input type="text" label="Group Name" 
            placeholder="Enter group name" ref="group"
            onChange={this.handleFormChange.bind(this)} />

          <ButtonInput type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = AddGroup;