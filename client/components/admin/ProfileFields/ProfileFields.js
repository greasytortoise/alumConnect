import React from 'react';
import {FormGroup, FormControl, Button, ListGroup, ListGroupItem, ControlLabel} from 'react-bootstrap';
import RestHandler from '../../../util/RestHandler';
import EditProfileField from './EditProfileField.js';

class ProfileFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFieldName: '',
      fields: [],
      error: false,
      isSaving: false

    }
  }

  componentDidMount() {
    RestHandler.Get('/db/fields', (err, res) => {
      this.setState({fields: res.body})
    });
  }

  renderFields() {
    return this.state.fields.map(function(field) {
      var {id, title} = field;
      return (
        <EditProfileField key={id} field={field} />
      );
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({isSaving: true});
    var field = this.state.newFieldName;

    var fieldInfo = {
      title: field
    };

    if (field === '') {
      this.setState({error: true});
    } else {
      RestHandler.Post('/db/fields', fieldInfo, (err, res) => {
        if (err) {return err;}
        this.setState({
          fields: this.state.fields.concat(res.body),
          isSaving: false,
          newFieldName: '',
        });
      });
    }
  }

  render() {
    return (
      <div>
        <h3 className="dashboard-title">Profile Fields</h3>
        <ListGroup>
          {this.renderFields()}
        </ListGroup>
        <FormGroup>
          <ControlLabel>Add Profile field</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter a new profile field"
            value={this.state.newFieldName}
            onChange={(e) =>{this.setState({newFieldName: e.target.value})}} />

          <Button
            type="submit"
            bsStyle="primary"
            disabled={this.state.isSaving}
            onClick={this.handleSubmit.bind(this)}>
            {this.state.isSaving ? 'Saving...' : 'Submit'}
          </Button>
        </FormGroup>
        {this.state.error && (
          <p>Enter a Profile Field.</p>
        )}
      </div>
    );
  }
}

module.exports = ProfileFields;
