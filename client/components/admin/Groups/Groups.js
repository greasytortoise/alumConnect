import React from 'react'
import {Input, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import EditGroup from './EditGroup.js'

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      error: false,
      isSaving: false
    }
  }

  componentWillMount() {
    RestHandler.Get('/db/groups', (err, res) => {
      this.setState({groups: res.body})
    });
  }

  renderGroups() {
    return this.state.groups.map(function(group) {
      var {id, group_name} = group;
      return (
        <EditGroup key={id} value={group} />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isSaving: true});
    var group = this.refs.group.getValue();
    var groupInfo = {
      group_name: group
    };

    if (group === '') {
      this.setState({
        error: true,
        isSaving: false
      });
    } else {
      RestHandler.Post('/db/groups', groupInfo, (err, res) => {
        if (err) {
          console.error(err);
          this.setState({
            error: true,
            isSaving: false
          });
        } else if(res.status === 200) {
          console.log('RESponse: ', res);
          setTimeout(() => {
            this.setState({ isSaving: false});
            this.setState({ groups: this.state.groups.concat([res.body]) });
            this.clearForm();
          }, 200);
        }
      });
    }
  }

  clearForm() {
    const fields = ['group'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
    });
  }

  render() {
    var isSaving = this.state.isSaving;

    return (
      <div>
        <h3 className="dashboard-title">Groups</h3>
        <ListGroup>
          {this.renderGroups()}
        </ListGroup>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Input type="text" label="Add Group"
            placeholder="Enter group name" ref="group" />

            <Button
              bsStyle="primary"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? 'Saving...' : 'Submit'}
            </Button>
          </form>
        {this.state.error && (
          <p>Enter a Group Name.</p>
        )}
      </div>
    );
  }
}

module.exports = Groups;
