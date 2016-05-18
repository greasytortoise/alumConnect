import React from 'react'
import { FormGroup, Col, Row, Checkbox, Input, Button, DropdownButton, MenuItem} from 'react-bootstrap'
import Select from 'react-select';
import RestHandler from '../../../util/RestHandler'
var _debounce = require('lodash/debounce');

class DashboardNewUser extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      groups: [],
      group: {},
      selectedGroups: [],
      githubInfo: undefined,
      isSaving: false
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


  handleSubmit(event) {
    event.preventDefault();
    this.setState({isSaving: true});
    var name = this.refs.name.getValue();
    var githubUsername = this.refs.githubUsername.getValue();
    var group = this.state.group.id;
    var data = {
      user: {
        githubid: this.state.githubInfo.id,
        handle: githubUsername,
        name: name,
        admin: this.refs.isadmin.refs.input.checked === true ? 1 : 0,
        public: this.refs.ispublic.refs.input.checked === true ? 1 : 0
      },
      groups: this.state.selectedGroups.split(',')
    };
    console.log(data);
    RestHandler.Post('db/users', data, (err, res) => {
      if(err) {
        console.error(err);
        this.setState({
          isSaving: false
        });
      } else if(res.status === 201) {
        console.log('RESponse: ', res);
        setTimeout(() => {
          this.setState({isSaving: false});
          this.clearForm();
        }, 200);
      }
    });
  }

  clearForm() {
    const fields = ['name', 'githubUsername'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
    });
    this.setState({selectedGroups: []});
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

  handleGroupSelect (selectedGroups) {
		this.setState({ selectedGroups });
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
            onChange={this.handleGroupSelect.bind(this)} />
            <div className="checkboxGroup">
              <Input
                id="ispubliccheck"
                className="checkbox"
                type="checkbox"
                ref="ispublic"
                defaultChecked
              />
              <label htmlFor="ispubliccheck" className="ispublictext">
              Make this user publicly visible?

              </label>
              <Input
                id="isadmincheck"
                className="checkbox"
                type="checkbox"
                ref="isadmin"
              />
              <label htmlFor="isadmincheck" className="isadmintext">
              Make this user an admin?

              </label>
            </div>
          <br />
          <Button
            className="float-left add-new-user-button"
            bsStyle="primary"
            disabled={disableButton === true || isSaving}
            type="submit"
            value={isSaving ? `Saving...` : 'Submit'}
          />
          {foundGithubUserMessage}
        </form>
      </div>
    );
  }
}

module.exports = DashboardNewUser;
