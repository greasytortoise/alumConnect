import React from 'react'
import {Input, ButtonInput, ListGroup, ListGroupItem} from 'react-bootstrap'
import RestHandler from '../../util/RestHandler'
import EditProfileField from './EditProfileField.js'

class ProfileFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: []
    }
  }

  componentDidMount() {
    RestHandler.Get('/db/fields', (err, res) => {
      this.setState({fields: res.body})
    });
  }

  renderFields() {
    var self = this;
    return this.state.fields.map(function(field) {
      var {id, field} = field;
      return (
        <EditProfileField value={field} />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var field = this.refs.field.getValue();

    var fieldInfo = {
      field: field
    };

    RestHandler.Post('/db/fields', fieldInfo, (err, res) => {
      if (err) {return err;}
      this.setState({fields: this.state.fields.concat(res.body)})
    });

    this.clearForm();
  }

  clearForm() {
    const fields = ['field'];
    fields.map(field => {
      this.refs[field].refs['input'].value = '';
    });
  }

  render() {
    return (
      <div>
        <h4>Profile Fields</h4>
        <ListGroup>
          {this.renderFields()}
        </ListGroup>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <Input type="text" label="Add Profile field" 
            placeholder="Enter field name" ref="field" />

          <ButtonInput type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

module.exports = ProfileFields;