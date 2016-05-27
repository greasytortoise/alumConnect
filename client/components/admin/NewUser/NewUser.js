import React from 'react'
import Griddle from 'griddle-react';
import { FormControl, Col, Row, Checkbox, InputGroup, Button, DropdownButton, MenuItem, ControlLabel} from 'react-bootstrap'
import Select from 'react-select';
import RestHandler from '../../../util/RestHandler';
import reactDOM from 'react-dom';
import { Link } from 'react-router';
import GroupsView from '../UsersGroupsView.js';



var _debounce = require('lodash/debounce');

class DashboardNewUser extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      groups: [],
      group: {},
      selectedGroups: [],
      githubInfo: undefined,
      isSaving: false,
      newUserPublic: true,
      newUserAdmin: false,
      users: [],
    };
    this.delayGithubTillTypingEnds = _debounce(this.handleCheckGithub,500);
  }
  componentDidMount () {
    this.getGroups();
    this.getRecentUsers();
  }

  getGroups() {
    RestHandler.Get('/db/groups', (err, res) => {
      //res.body.map is a Workaround to get the Select valueKey working.
      //it ads a property with a stringified id to res.body.
      res.body.map(obj => obj['idString'] = obj['id'].toString())
      this.setState({groups: res.body});
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isSaving: true});
    var name = reactDOM.findDOMNode(this.refs.name).value;
    var githubUsername = reactDOM.findDOMNode(this.refs.githubUsername).value;
    var group = this.state.group.id;
    var data = {
      user: {
        githubid: this.state.githubInfo.id,
        handle: githubUsername,
        name: name,
        image: '/assets/default.png',
        admin: this.state.newUserAdmin === true ? 1 : 0,
        public: this.state.newUserPublic === true ? 1 : 0,
      },
      groups: this.state.selectedGroups.split(','),
    };
    console.log(data);
    RestHandler.Post('db/users', data, (err, res) => {
      if(err) {
        console.error(err);
        this.setState({ isSaving: false });
      } else if (res.status === 201) {
        console.log('response: ', res);
        setTimeout(() => {
          this.setState({isSaving: false, githubInfo: undefined });
          this.getRecentUsers()
          this.clearForm();
        }, 200);
      }
    });
  }

  clearForm() {
    const fields = ['name', 'githubUsername'];
    fields.map(field => {
      // this.refs[field].refs['input'].value = '';
      reactDOM.findDOMNode(this.refs[field]).value = '';
    });
    this.setState({
      selectedGroups: [],
    });
  }

	handleCheckGithub () {
    var githubUsername = reactDOM.findDOMNode(this.refs.githubUsername).value;
    // var url = 'https://api.github.com/users/' + githubUsername + '?access_token=';
    var url = '/auth/checkgithub?handle=' + githubUsername;

    RestHandler.Get(url, (err, res) => {
      if(err) {
        this.setState({githubInfo: undefined});
      } else {
        if(res.body.id) {
          this.setState({githubInfo: res.body});
        } else {
          this.setState({githubInfo: undefined});
        }
      }
    });
	}

  handleGroupSelect (selectedGroups) {
		this.setState({ selectedGroups });
	}


  //****************
  //GRIDDLE*********
  //****************

  getRecentUsers() {
    RestHandler.Get('/db/users', (err, res) => {
      var users = res.body.reverse();
      for (var i = 0; i < users.length; i++) {
        users[i].Name = this.getProfileLink(users[i].id, users[i].name);
        users[i].Github = this.getGithubLink(users[i].handle);
        users[i].Groups = this.renderProfileGroups(users[i]);
      }
      this.setState({ users: users });
    });
  }

  getProfileLink(id, name) {
    return (
      <div className="userLink">
        <Link to={{ pathname: `/users/${id}` }}>
          {name}
        </Link>
      </div>
   );
  }

  getGithubLink(github) {
    return (
      <div className="ghLink">
        <a href={`https://www.github.com/${github}`}>
          {github}
        </a>
      </div>
   );
  }

  renderProfileGroups(user) {
    return (
      <GroupsView
        selectedGroups={user.groups}
      />
    );
  }


  render() {
    var isSaving = this.state.isSaving;

    var groupName = this.state.group.group_name || 'Select Group';
    var foundGithubUserMessage
    if(this.state.githubInfo === undefined) {
      foundGithubUserMessage = <span className="findingGithubInfo">Enter a valid github username</span>
    } else if (this.state.githubInfo === 'loading'){
      foundGithubUserMessage = <span className="findingGithubInfo">Loading...</span>
    } else {
      var login = this.state.githubInfo.login;
      var id = this.state.githubInfo.id;
      var url = this.state.githubInfo.html_url;
      var name = this.state.githubInfo.name;
      foundGithubUserMessage = <span className="findingGithubInfo" >
        found <a href={url} target="_blank">{login} on github</a>: (name: {name}, id: {id})
      </span>
    }

    var disableButton = !this.state.githubInfo || this.state.githubInfo === 'loading';

    return (
      <div>
        <h3 className="dashboard-title">Add new user</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <InputGroup>
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" label="Full Name" placeholder="Enter name"
              ref="name" />
          </InputGroup>

          <InputGroup>
            <ControlLabel>Github Account {foundGithubUserMessage}</ControlLabel>
            <FormControl
              type="text"
              label="Github Username"
              placeholder="Enter Github Username"
              ref="githubUsername"
              onChange={function() {
                if(this.state.githubInfo !== 'loading') {
                  this.setState({githubInfo: 'loading'});
                }
                this.delayGithubTillTypingEnds();
              }.bind(this)}/>
          </InputGroup>

          <label>Group(s)</label>
          <Select
            multi
            simpleValue
            disabled={this.state.disabled} value={this.state.selectedGroups} placeholder="Select groups"
            labelKey="group_name"
            valueKey="idString"
            options={this.state.groups}
            onChange={this.handleGroupSelect.bind(this)} />
            <div className="checkboxGroup">

              <Checkbox
                className="publicCheckbox"
                checked={this.state.newUserPublic}
                onChange= {() => {
                  this.setState({newUserPublic: !this.state.newUserPublic});
                }}>
                Make this user publicly visible?
              </Checkbox>

              <Checkbox
                checked={this.state.newUserAdmin}
                onChange= {() => {
                  this.setState({newUserAdmin: !this.state.newUserAdmin});
                }}>
                Give user admin access
              </Checkbox>

            </div>
          <br />
          <Button
            className="float-left add-new-user-button"
            bsStyle="primary"
            disabled={disableButton === true || isSaving}
            type="submit"
          >
          {isSaving ? 'Saving...' : 'Submit'}
          </Button>
        </form>

        <br /><br /><br />
        <h3>Recently added</h3>
          <Griddle
            results={this.state.users}
            showFilter={false}
            key={this.state.key}
            ref='usertable'
            tableClassName='table'
            useGriddleStyles={false}
            resultsPerPage={10}
            columns={["id", "Name", "Github", "Groups"]}/>
      </div>
    );
  }
}

module.exports = DashboardNewUser;
