import React from 'react'
import { Input, Button, Modal} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import Select from 'react-select'
import $ from 'jquery';

class DashboardEditGroup extends React.Component {
  constructor(props) {
    super(props);
    var group = this.props.value;
    this.state = {
      editing: false,
      id: group.id,
      group_name: group.group_name,
      visibleGroups: group.visibleGroups,
      selectedGroups: [],
      allGroups: this.props.groups
    }
  }

  handleEditState(e) {
    var visibleGroups = [];
    var groups = this.state.visibleGroups;
    console.log(groups);
    for (var id in groups) {
      var idString = id.toString();
      visibleGroups.push(idString);
      // console.log(id, visibleGroups);
    }
    e.preventDefault();
    this.setState({
      editing: true,
      selectedGroups: visibleGroups,
    });
  }

  handleGroupNameEdit(e) {
    this.setState({
      group_name: this.refs.group.getValue()
    });
  }

  handleVisibleGroupSelect (selectedGroups) {
    var groups  = selectedGroups.split(',');
    var visibleGroups = {}; 
    this.state.allGroups.forEach(function(group){
      for (var i = 0; i < groups.length; i++) {
        if(groups[i] == group.idString){
          visibleGroups[group.id] = group.group_name;
        }
      }
    })
    // console.log(this.state.allGroups, visibleGroups)
    this.setState({ 
      selectedGroups:groups,
      visibleGroups: groups
    });
  }

  saveEdit (event) {
    event.preventDefault();
    var data = {
      id: this.state.id,
      group_name: this.state.group_name,
      visibleGroups: this.state.visibleGroups
    };
    console.log('data',data);
    if(this.state.group_name === '') {
      console.log(data);
      this.setState({error: true, editing: false});
    } else {
      RestHandler.Post('/db/groups/group/' + this.state.id, data, (err, res) => {
        if (err) {console.log(err);}
        console.log('hi there', res.body)
        this.setState({ editing: false });
      });
    }
  }

  closePopup() {
    this.setState({ editing: false });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.editing}
          onHide={this.closePopup.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Edit Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input type="text" value={this.state.group_name}
            onChange={this.handleGroupNameEdit.bind(this)} ref="group" />
            <Select
            multi
            simpleValue
            disabled={this.state.disabled} value={this.state.selectedGroups} 
            placeholder="Select visible groups"
            labelKey="group_name"
            valueKey="idString"
            options={this.state.allGroups}
            onChange={this.handleVisibleGroupSelect.bind(this)} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.saveEdit.bind(this)}>Save</Button>
          </Modal.Footer>
        </Modal>

        <Button bsStyle="link" onClick={this.handleEditState.bind(this)}>
        Edit</Button>
      </div>
    );
  }
}

module.exports = DashboardEditGroup;
