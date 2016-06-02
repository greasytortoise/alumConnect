import React from 'react'
import {Link} from 'react-router';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import RestHandler from '../../../util/RestHandler';
var _map = require('lodash/map');


class ProfileGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      selectedGroups: [],
    };
  }

  componentDidMount() {
    var selectedGroups  = _map(this.props.selectedGroups, (key, val) => val).join(',');
    this.setState({selectedGroups: selectedGroups})
    this.getAvailableGroups();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      var selectedGroups  = _map(this.props.selectedGroups, (key, val) => val).join(',');
      this.setState({selectedGroups: selectedGroups})
    }
  }

  getAvailableGroups() {
    RestHandler.Get('/db/groups', (err, res) => {
      //res.body.map is a Workaround to get the Select valueKey working.
      //it ads a property with a stringified id to res.body.
      res.body.map(obj => obj['idString'] = obj['id'].toString())
      this.setState({groups: res.body});
    });
  }

  handleGroupSelect (selectedGroups) {
    selectedGroups = selectedGroups || "";
		this.setState({ selectedGroups });
    this.props.stageProfileEdits((editedObject) => {
      editedObject.groups = selectedGroups.split(',');
    });
	}

  displayUsersGroups() {
    return _map(this.props.selectedGroups, (groupName, groupId) => {
      var groupObj = {id: groupId, group_name: groupName};
      return(
        <Link to={`/`}
        key={groupId}
        onClick={function() {
          localStorage.setItem('selectedGroup', JSON.stringify(groupObj));
        }}>
        {` ${groupName} `}
      </Link>)
    });
  }

  renderGroups() {
    var editing = this.props.editing;
    var selectedGroups = this.props.selectedGroups;

    if(!editing && selectedGroups) {
      return (
        <h3>Groups: {this.displayUsersGroups()}</h3>
      );
    }
    else if(editing) {
      return (
        <Select
          multi
          simpleValue
          disabled={this.state.disabled} value={this.state.selectedGroups} placeholder="Select groups"
          labelKey="group_name"
          valueKey="idString"
          options={this.state.groups}
          onChange={this.handleGroupSelect.bind(this)} />
      );
    } else {
      return(<div>No groups selected</div>)
    }
  }

  render() {
    return (
      <div className="profile-groups">{this.renderGroups()}</div>
    )
  }
}

module.exports = ProfileGroups;
