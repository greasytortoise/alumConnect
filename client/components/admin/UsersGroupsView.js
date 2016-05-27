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
      groups: [],
      selectedGroups: [],
    };
  }

  componentWillMount() {
    var selectedGroups  = _map(this.props.selectedGroups, (key, val) => val).join(',');
    // this.setState({selectedGroups: selectedGroups})
    this.getAvailableGroups();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      var selectedGroups  = _map(this.props.selectedGroups, (key, val) => val).join(',');
      // this.setState({selectedGroups: selectedGroups})
    }
  }

  getAvailableGroups() {
    RestHandler.Get('/db/groups', (err, res) => {
      //res.body.map is a Workaround to get the Select valueKey working.
      //it ads a property with a stringified id to res.body.
      res.body.map(obj => obj['idString'] = obj['id'].toString())
      this.setState({ groups: res.body });
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
