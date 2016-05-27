import React from 'react';
import {FormGroup, Row, Col, FormControl, Modal, Button, ListGroup, ListGroupItem, ControlLabel} from 'react-bootstrap';
import RestHandler from '../../../util/RestHandler';
import EditProfileField from './EditProfileField.js';
import $ from 'jquery';
import request from 'superagent';

class ProfileFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFieldName: '',
      fields: [],
      error: false,
      isSaving: false,
      showDelete: false,
      toBeDeleted: {
        id: null,
      },

    }
  }

  componentDidMount() {
    RestHandler.Get('/db/fields', (err, res) => {
      this.setState({fields: res.body})
    });
  }


  
  getDeleteLink(id) {
    var data = JSON.stringify(id);
    return (
      <div key={id} className="deleteLink2" data={data}
        onClick={this.setDeleteState.bind(this)}
      >
      </div>
    );
  }

  setDeleteState(e) {
    var data = JSON.parse($(e.target).attr('data'));
    e.preventDefault();
    this.setState({ toBeDeleted: {
      id: data,
    },
    showDelete: true });
  }

  resetDeleteState() {
    this.setState({ toBeDeleted: {
      id: null,
    },
    showDelete: false });
  }

  deleteField(e) {
    var that = this
    e.preventDefault();
    request
      .delete('/db/fields/field/' + that.state.toBeDeleted.id)
      .end(function(err, res) {
        if(err) {
          console.log(err);
        } else {
          console.log('Field deleted');
          for (var i = 0; i < that.state.fields.length; i++) {
            if (that.state.fields[i].id == that.state.toBeDeleted.id) {
              that.state.fields.splice(i, 1);
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

  renderFields() {
    var that = this;
    return this.state.fields.map(function(field) {
      var {id, title} = field;
      return (
        <Row>
          <Col xs={11}>
            <EditProfileField key={id} field={field} />
          </Col>
          <Col xs={1}>
            {that.getDeleteLink(id)}
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <div>
        <h3 className="dashboard-title">Profile Fields</h3>
        <Modal
          show={this.state.showDelete}
          onHide={this.closePopup.bind(this)}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Delete Field</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this field?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closePopup.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.deleteField.bind(this)}>Delete</Button>
          </Modal.Footer>
        </Modal>
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
