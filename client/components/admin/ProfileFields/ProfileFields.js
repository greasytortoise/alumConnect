import React from 'react'
import {Input, ButtonInput, ListGroup, ListGroupItem} from 'react-bootstrap'
import RestHandler from '../../../util/RestHandler'
import EditProfileField from './EditProfileField.js'

class ProfileFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      error: false
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
        <EditProfileField key={id} value={field} />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var field = this.refs.field.getValue();

    var fieldInfo = {
      title: field
    };

    if (field === '') {
      this.setState({error: true});
    } else {
      RestHandler.Post('/db/fields', fieldInfo, (err, res) => {
        if (err) {return err;}
        this.setState({fields: this.state.fields.concat(res.body)})
      });

      this.clearForm();
    }
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
        <h3 className="dashboard-title">Profile Fields</h3>
        <ListGroup>
          {this.renderFields()}
        </ListGroup>
        <form onSubmit={this.handleSubmit.bind(this)}>

          <Input type="text" label="Add Profile field"
            placeholder="Enter field name" ref="field" />

          <ButtonInput bsStyle="primary" type="submit" value="Submit"/>
        </form>
        {this.state.error && (
          <p>Enter a Profile Field.</p>
        )}
      </div>
    );
  }
}

module.exports = ProfileFields;
