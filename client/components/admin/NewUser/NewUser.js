import React from 'react'
import { FormControl, Col, Row, Checkbox, InputGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap'
import Select from 'react-select';
import RestHandler from '../../../util/RestHandler';
import reactDOM from 'react-dom';

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
        admin: this.state.newUserAdmin === true ? 1 : 0,
        public: this.state.newUserPublic === true ? 1 : 0,
      },
      groups: this.state.selectedGroups.split(','),
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
          this.setState({isSaving: false, githubInfo: undefined });
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
    this.setState({
      selectedGroups: [],
    });
  }

	handleCheckGithub () {
    var githubUsername = reactDOM.findDOMNode(this.refs.githubUsername).value;
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
      foundGithubUserMessage = <span className="findingGithubInfoI">Enter a valid github username</span>
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
          <InputGroup
          controlId="newuserform"
          >
            <FormControl type="text" label="Full Name" placeholder="Enter name"
              ref="name" />
            <FormControl
              className="ghUsernameInput"
              type="text"
              label="Github Username"
              placeholder="Enter Github Username"
              ref="githubUsername"
              onChange={function() {
                this.setState({githubInfo: 'loading'});
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
                checked={this.state.hasAdminAccess}
                onChange= {() => {
                  this.setState({newUserPublic: !this.state.newUserPublic});
                }}
              >
                Make this user publicly visible?
              </Checkbox>

              <Checkbox
                checked={this.state.newUserAdmin}
                onChange= {() => {
                  this.setState({newUserAdmin: !this.state.newUserAdmin});
                }}
              >
                Make this user an admin?
              </Checkbox>

            </div>
          <br />
          <Row>
            <Col xs={12}>
            <Button
              bsSize="lg"
              className="float-left add-new-user-button"
              bsStyle="primary"
              disabled={disableButton === true || isSaving}
              type="submit"
            >
            {isSaving ? 'Saving...' : 'Submit'}
            </Button>
            </Col>
            {foundGithubUserMessage}
          </Row>
        </form>
      </div>
    );
  }
}

module.exports = DashboardNewUser;
