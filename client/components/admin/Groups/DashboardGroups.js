import React from 'react'
import Griddle from 'griddle-react';
import {Input, Button, ButtonInput, Modal, Col} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import EditGroup from './DashboardEditGroup.js'
import Select from 'react-select'
import $ from 'jquery';
import request from 'superagent';


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
      key: 666,
      showDelete: false,
      toBeDeleted: {
        id: null,
        name: null,
      },
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
        groups[i]['Can See'] = ''
        var visibleGroups = groups[i].visibleGroups;
        if (groups[i].group_name === 'staff') {
          groups[i]['Can See'] = 'All Groups';
        } else {
          for (var id in visibleGroups) {
            groups[i]['Can See'] += visibleGroups[id] + ', ';
          }
          groups[i]['Can See'] = groups[i]['Can See'].replace(/,\s*$/, "");
        }

        groups[i].Edit = this.getEditGroupLink(groups[i]);
        groups[i].Delete = this.getDeleteLink(groups[i].id, groups[i].group_name);
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

  getDeleteLink(id, name) {
    var data = JSON.stringify({ id: id, name: name });
    return (
        <Col xs={4} >
          <div className="deleteLink" data={data}
            onClick={this.setDeleteState.bind(this)}
          >
          </div>
        </Col>
    );
  }

  setDeleteState(e) {
    var data = JSON.parse($(e.target).attr('data'));
    e.preventDefault();
    this.setState({ toBeDeleted: {
      id: data.id,
      name: data.name,
    },
    showDelete: true });
  }

  resetDeleteState() {
    this.setState({ toBeDeleted: {
      id: null,
      name: null,
    },
    showDelete: false });
  }

  deleteGroup(e) {
    var that = this;
    e.preventDefault();
    request
      .delete('/db/groups/group/' + that.state.toBeDeleted.id)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          console.log('Group deleted');
          for (var i = 0; i < that.state.groups.length; i++) {
            if (that.state.groups[i].id === that.state.toBeDeleted.id) {
              that.state.groups.splice(i, 1);
              break;
            }
          }
          that.setState({ key: Math.random() });
          that.resetDeleteState();
        }
      });
  }


  closePopup() {
    this.setState({ showDelete: false });
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
        <Modal
          show={this.state.showDelete}
          onHide={this.closePopup.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Delete Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete group: {this.state.toBeDeleted.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deleteGroup.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>
        <Griddle
          results={this.state.groups}
          rowMetadata={rowMetadata}
          ref='groupstable'
          key={this.state.key}
          tableClassName='table'
          useGriddleStyles={false}
          resultsPerPage={40}
          columns={["group_name", "Can See", "Edit", "Delete"]}/>

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
