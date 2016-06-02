import React from 'react'
import {Link} from 'react-router';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import RestHandler from '../../util/RestHandler';
var _map = require('lodash/map');


class ProfileGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedGroups: [],
    };
  }

  componentWillMount() {
    var selectedGroups = _map(this.props.selectedGroups, (key, val) => val).join(',');
    this.setState({selectedGroups: selectedGroups})
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
    // var selectedGroups = this.state.selectedGroups;
    return (
      <div className="adminGroupUsersText">{this.displayUsersGroups()}</div>
    );
  }

  render() {
    return (
      <div>{this.renderGroups()}</div>
    );
  }
}

module.exports = ProfileGroups;
