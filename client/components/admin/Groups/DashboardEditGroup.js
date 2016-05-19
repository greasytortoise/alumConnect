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
      visibleGroups: [],
      allGroups: this.props.groups
    }
    console.log(this.state.group_name, this.state.visibleGroups);
  }

  handleEditState(e) {
    for (var i = 0; i < this.state.length; i++) {
      groups[i].idString = groups[i].id.toString();
    }
    e.preventDefault();
    this.setState({
      editing: true,
    });
  }

  handleGroupNameEdit(e) {
    this.setState({
      group_name: this.refs.group.getValue()
    });
  }

  handleVisibleGroupSelect (selectedGroups) {
    console.log(selectedGroups)
    this.setState({ 
      visibleGroups:selectedGroups.split(',')
    });
  }

  saveEdit (event) {
    event.preventDefault();
    var data = {
      id: this.state.id,
      group_name: this.state.group_name,
      visibleGroups: this.state.visibleGroups
    };

    if(group === '') {
      this.setState({error: true, editing: false});
    } else {
      RestHandler.Post('/db/groups/group/' + this.state.editGroup.id, data, (err, res) => {
        if (err) {return err;}
        console.log(res.body)
        this.setState({ editing: false });
        // this.setState({groups: this.state.groups.concat(res.body)})
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
            disabled={this.state.disabled} value={this.state.allGroups} placeholder="Select groups"
            labelKey="group_name"
            valueKey="idString"
            options={this.state.groups}
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
