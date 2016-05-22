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
    // console.log(index, groups.length, this.state.groups.length);
    var data = JSON.parse(JSON.stringify(group));
    return (
      <EditGroup value={data} groups={groups}/>
    );
  }

  // handleEditState(e) {
  //   var data = JSON.parse($(e.target).attr('data'));
  //   console.log(data.group.visibleGroups)
  //   // var visible = data.group.visibleGroups || null;
  //   e.preventDefault();
  //   this.setState({
  //     editGroup: {
  //       id: data.group.id,
  //       group_name: data.group.group_name,
  //       visibleGroups: data.group.visibleGroups.id
  //     },
  //     editing: true,
  //   });
  //   // console.log(this.state.editGroup)
  // }

  // handleEdit(e) {
  //   this.setState({
  //     editGroup: {
  //       group_name: this.refs.group.getValue()
  //     }
  //   });
  // }

  // saveEdit (event) {
  //   event.preventDefault();
  //   var group = this.refs.group.getValue();
  //   var data = {
  //     id: this.state.editGroup.id,
  //     group_name: group,
  //     visibleGroups: this.state.editGroup.visibleGroups
  //   };

  //   if(group === '') {
  //     this.setState({error: true, editing: false});
  //   } else {
  //     RestHandler.Post('/db/groups/group/' + this.state.editGroup.id, data, (err, res) => {
  //       if (err) {return err;}
  //       console.log(res.body)
  //       this.setState({ editing: false });
  //       // this.setState({groups: this.state.groups.concat(res.body)})
  //     });
  //   }
  // }

  // closePopup() {
  //   this.setState({ editing: false });
  // }

  // handleVisibleGroupSelect (selectedGroups) {
  //   this.setState({ editGroup:{
  //     id: this.state.editGroup.id,
  //     group_name: this.state.editGroup.group_name,
  //     selectedGroups:selectedGroups.split(',')
  //   }});
  //   console.log(this.state.editGroup)
  // }

  handleGroupSelect (selectedGroups) {
    // var selectGroups = [];
    // selectGroups.push.apply(selectGroups, selectedGroups.split(",").map(Number));
    var selectGroups = selectedGroups.split(',');
    // console.log(selectGroups);
    this.setState({ selectedGroups: selectGroups});
  }
    
  handleSubmit(event) {
    event.preventDefault();
    var group = this.refs.group.getValue();
    // console.log(group, this.state.selectedGroups)
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
          resultsPerPage={5}
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
          <ButtonInput bsStyle="primary" type="submit" value="Submit"/>
        </form>

        {this.state.error && (
          <p>Enter a Group Name and select groups that are visible.</p>
        )}
      </div>
    );
  }
}

module.exports = Groups;
  
        // <Modal
        //   show={this.state.editing}
        //   onHide={this.closePopup.bind(this)}
        //   container={this}
        //   aria-labelledby="contained-modal-title">
        //   <Modal.Header closeButton>
        //     <Modal.Title id="contained-modal-title">Edit Group</Modal.Title>
        //   </Modal.Header>
        //   <Modal.Body>
        //     <Input type="text" value={this.state.editGroup.group_name}
        //     onChange={this.handleEdit.bind(this)} ref="group" />
        //     <Select
        //     multi
        //     simpleValue
        //     disabled={this.state.disabled} value={this.state.editGroup.visibleGroups} placeholder="Select groups"
        //     labelKey="group_name"
        //     valueKey="idString"
        //     options={this.state.groups}
        //     onChange={this.handleVisibleGroupSelect.bind(this)} />
        //   </Modal.Body>
        //   <Modal.Footer>
        //     <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
        //     <Button bsStyle="primary" onClick={this.saveEdit.bind(this)}>Save</Button>
        //   </Modal.Footer>
        // </Modal>