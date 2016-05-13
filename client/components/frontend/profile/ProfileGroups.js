import React from 'react'
import { Input, Button } from 'react-bootstrap';
import Select from 'react-select';
import RestHandler from '../../../util/RestHandler'


class ProfileGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      selectedGroups: [],
    };
  }

  componentDidMount() {
    this.setState({selectedGroups: this.props.selectedGroups})
    this.handleGroupSelect(this.props.selectedGroups);
    this.getAvailableGroups();
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
    debugger;
		this.setState({ selectedGroups });
	}

  renderGroups() {
    var editing = this.props.editing;
    var selectedGroups = this.state.selectedGroups;

    if(!editing && selectedGroups) {
      return (
        <div>not editing</div>
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
      return(<div>else</div>)
    }
  }

  render() {
    console.log(this.props.groups);
    return (
      this.renderGroups()
    )
  }
}

module.exports = ProfileGroups;
