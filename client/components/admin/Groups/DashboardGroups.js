import React from 'react'
import Griddle from 'griddle-react';
import {Input, Button, ButtonInput, Modal} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import EditGroup from './DashboardEditGroup.js'
import Select from 'react-select'
import $ from 'jquery';

var rowMetadata = {
    "bodyCssClassName": function(rowData) {
        if (rowData.action === "added") {
            return "green-row";
        } else if (rowData.action === "removed") {
            return "red-row";
        } else if (rowData.action === "transfer") {
            return "blue-row";
        }
        return "default-row";
    },
}; 

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      selectedGroups: [],
      error: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if(nextProps) {
      this.setState({
        groups: []
      });
      this.getGroups();
    }
  }

  componentWillMount() {
    this.getGroups();
  }

  getGroups() {
    RestHandler.Get('/db/groups', (err, res) => {
      var groups = res.body;
      this.setState({ groups: res.body });
      for (var i = 0; i < groups.length; i++) {
        groups[i].idString = groups[i].id.toString();
        groups[i].Visible_Groups = ''
        var visibleGroups = groups[i].visibleGroups;
        for (var id in visibleGroups) {
          groups[i].Visible_Groups += visibleGroups[id] + ', ';
        }
        groups[i].Visible_Groups = groups[i].Visible_Groups.replace(/,\s*$/, "");
        groups[i].Edit = this.getEditGroupLink(groups[i]);
      }
      this.setState({ groups: groups });
    });
  }

  getEditGroupLink(group) {
    var groups = this.state.groups.slice();
    var index = groups.indexOf(group);
    groups.splice(index, 1)
    var data = JSON.parse(JSON.stringify(group));
    return (
      <EditGroup getGroups={this.getGroups.bind(this)} value={data} groups={groups}/>
    );
  }

  handleGroupSelect (selectedGroups) {
    var selectGroups = selectedGroups.split(',');
    this.setState({ selectedGroups: selectGroups});
  }
    
  handleSubmit(event) {
    event.preventDefault();
    var group = this.refs.group.getValue();
    var data = {
      group_name: group,
      visibleGroups: this.state.selectedGroups
    };
    console.log(data)

    if(group === '' || data.visibleGroups.length === 0) {
      this.setState({error: true});
    } else {
      RestHandler.Post('/db/groups', data, (err, res) => {
        if (err) {return err;}
        this.getGroups();
      });

      this.clearForm();
    }
  }

  clearForm() {
    const fields = ['group'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
    });
    this.setState({selectedGroups: []});
  }

  render() {
    return (
      <div>
        <h3 className="dashboard-title">Groups</h3>
        <Griddle
          results={this.state.groups}
          rowMetadata={rowMetadata}
          ref='groupstable'
          tableClassName='table'
          useGriddleStyles={false}
          resultsPerPage={40}
          columns={["group_name","Visible_Groups","Edit"]}/>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <Input type="text" label="Add Group"
            placeholder="Enter group name" ref="group" />
          <Select
            multi
            simpleValue
            disabled={this.state.disabled} value={this.state.selectedGroups} placeholder="Select visible groups"
            labelKey="group_name"
            valueKey="idString"
            options={this.state.groups}
            onChange={this.handleGroupSelect.bind(this)} />
          <ButtonInput className="newGroupSubmitButton" bsStyle="primary" type="submit" value="Submit"/>
        </form>

        {this.state.error && (
          <p>Enter a Group Name and select groups that are visible.</p>
        )}
      </div>
    );
  }
}

module.exports = Groups;
  
