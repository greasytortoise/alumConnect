import React from 'react'
import {Input, ButtonInput, DropdownButton, MenuItem} from 'react-bootstrap'
import Select from 'react-select';
import RestHandler from '../../util/RestHandler'
var _debounce = require('lodash/debounce');

class DashboardNewUser extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      groups: [],
      group: {},
      selectedGroups: [],
      githubInfo: undefined
    };
    this.delayGithubTillTypingEnds = _debounce(this.handleCheckGithub,500);
  }
  componentDidMount () {
    this.getGroups();
  }

  getGroups() {
    RestHandler.Get('/db/groups', (err, res) => {
      //res.body.map is a Workaround to get the Select valueKey working.
      //it ads a property with a stringified id to res.body.
      res.body.map(obj => obj['idString'] = obj['id'].toString())
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
    this.setState({
      group: key
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.refs.name.getValue();
    var githubUsername = this.refs.githubUsername.getValue();
    var group = this.state.group.id;
    var data = {
      user: {
        githubid: this.state.githubInfo.id,
        handle: githubUsername,
        name: name
      },
      groups: this.state.selectedGroups.split(',')
    };
    console.log(data);
    RestHandler.Post('db/users', data, (err, res) => {
      if(err) {
        console.log(err)
      }
      this.clearForm();
    });
  }

  clearForm() {
    const fields = ['name', 'githubUsername'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
    });
    this.setState({selectedGroups: []});
  }


	handleSelectChange (selectedGroups) {
		this.setState({ selectedGroups });
	}
	handleCheckGithub () {
    var githubUsername = this.refs.githubUsername.getValue();
    var url = 'https://api.github.com/users/' + githubUsername;

    RestHandler.Get(url, (err, res) => {
      if(err) {
        this.setState({githubInfo: undefined});
      } else {
        this.setState({githubInfo: res.body});
      }
    });
	}


  render() {
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
          <Input type="text" label="Full Name" placeholder="Enter name"
            ref="name" />
          <Input
            type="text"
            label="Github Username"
            placeholder="Enter Github Username"
            ref="githubUsername"
            onChange={function() {
              this.setState({githubInfo: 'loading'});
              this.delayGithubTillTypingEnds()
            }.bind(this)}/>

          <label>Group(s)</label>
          <Select
            multi
            simpleValue
            disabled={this.state.disabled} value={this.state.selectedGroups} placeholder="Select groups"
            labelKey="group_name"
            valueKey="idString"
            options={this.state.groups}
            onChange={this.handleSelectChange.bind(this)} />
            <br />
          <ButtonInput
            className="float-left add-new-user-button"
            bsStyle="primary"
            type="submit"
            value="Submit"
            disabled={disableButton}/>
          {foundGithubUserMessage}
        </form>
      </div>
    );
  }
}

module.exports = DashboardNewUser;

// {user: Object, groups: "7,1"}

//<Input type="text" addonBefore="https://www.linkedin.com/in/" label="Networks" placeholder="Enter LinkedIn Username" />
// <Input type="text" addonBefore="https://github.com/" placeholder="Enter Github Handle" />
