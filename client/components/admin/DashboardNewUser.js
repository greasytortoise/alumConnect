import React from 'react'
import {Input, ButtonInput, DropdownButton, MenuItem} from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'

class DashboardNewUser extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      groups: [],
      group: {},
      user: {
        name: '',
        email: '',
        password: '',
        group: {}
      }
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
        <MenuItem key={id} eventKey={group} onSelect={groupSelect}>{group_name}</MenuItem>
      );
    });
  }

  groupSelect(evt, key) {
    console.log(key); 
    this.setState({
      user: {
        group: key
      }
    });  
    console.log('group', this.state.group);
  }

  handleFormChange(evt, key) {
    // console.log(this.refs.name.refs.input.value);
    this.setState({
      user: {
        name: this.refs.name.refs.input.value,
        email: this.refs.email.refs.input.value,
        password: this.refs.password.refs.input.value,
        group: this.state.group
      }
    });
    console.log('user', this.state.user);
  }

  render() {
    return (
      <form>
        <Input type="text" label="Name" placeholder="Enter name"
          ref="name"
          onChange={this.handleFormChange.bind(this)} />
        <Input type="email" label="Email Address" placeholder="Enter email" 
          ref="email"
          onChange={this.handleFormChange.bind(this)}/>
        <Input type="password" label="Password" placeholder="Enter new password"
          ref="password"
          onChange={this.handleFormChange.bind(this)}/> 

        <label>Group  </label>
        <DropdownButton title="Select Group">
          {this.renderGroups(this.groupSelect)}
        </DropdownButton>
   
        <ButtonInput type="submit" value="Submit" />

      </form>
    );
  }
}

module.exports = DashboardNewUser;

//<Input type="text" addonBefore="https://www.linkedin.com/in/" label="Networks" placeholder="Enter LinkedIn Username" />
// <Input type="text" addonBefore="https://github.com/" placeholder="Enter Github Handle" />
