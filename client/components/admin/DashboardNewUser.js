import React from 'react'
import {Input, ButtonInput, DropdownButton, MenuItem} from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'

class DashboardNewUser extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      groups: [],
      group: {}
    };
  }

  componentDidMount () {
    this.getGroups();
  }

  getGroups() {
    RestHandler.Get('/db/groups', (err, res) => {
      this.setState({groups: res.body});
    });
  }

  renderGroups(groupSelect) {
    return this.state.groups.map (function(group) {
      var {id, group_name} = group;
      return (
        <MenuItem key={id} eventKey={id} onSelect={groupSelect}>{group_name}</MenuItem>
      );
    });
  }

  groupSelect(evt) {
    console.log(evt);
  }

  render() {
    return (
      <form>
        <Input type="text" label="Name" placeholder="Enter name" />
        <Input type="email" label="Email Address" placeholder="Enter email" />
        <Input type="password" label="Password" placeholder="Enter new password"/> 

        <label>Group  </label>
        <DropdownButton title="Select Group">
          {this.renderGroups(this.groupSelect)}
          <MenuItem divider />
          <MenuItem eventKey="new group" onSelect={this.groupSelect}>Add New Group</MenuItem>
        </DropdownButton>
   
        <ButtonInput type="submit" value="Submit" />

      </form>
    );
  }
}

module.exports = DashboardNewUser;

//<Input type="text" addonBefore="https://www.linkedin.com/in/" label="Networks" placeholder="Enter LinkedIn Username" />
// <Input type="text" addonBefore="https://github.com/" placeholder="Enter Github Handle" />
