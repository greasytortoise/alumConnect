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

  renderGroups(handleGroupSelect) {
    return this.state.groups.map (function(group) {
      var {id, group_name} = group;
      return (
        <MenuItem key={id} eventKey={group} onSelect={handleGroupSelect}>{group_name}</MenuItem>
      );
    });
  }

  handleGroupSelect(evt, key) {
    console.log(key); 
    this.setState({
      group: key
    });  
    console.log('group', this.state.group);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.refs.name.getValue();
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    var group = this.state.group.group_name;

    var data = {
      username: name,
      password: password,
      email: email,
      group: group
    };

    RestHandler.Post('db/users', data, (err, res) => {

    });
    this.clearForm();
  }

  clearForm() {
    const fields = ['name', 'email', 'password'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
    });
  }

  render() {
    var groupName = this.state.group.group_name || 'Select Group';
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text" label="Name" placeholder="Enter name"
          ref="name" />
        <Input type="email" label="Email Address" placeholder="Enter email" 
          ref="email" />
        <Input type="password" label="Password" placeholder="Enter new password"
          ref="password" /> 

        <label>Group</label>
        <DropdownButton title={groupName}>
          {this.renderGroups(this.handleGroupSelect.bind(this))}
        </DropdownButton>
   
        <ButtonInput type="submit" value="Submit" />
      </form>
    );
  }
}

module.exports = DashboardNewUser;

//<Input type="text" addonBefore="https://www.linkedin.com/in/" label="Networks" placeholder="Enter LinkedIn Username" />
// <Input type="text" addonBefore="https://github.com/" placeholder="Enter Github Handle" />
