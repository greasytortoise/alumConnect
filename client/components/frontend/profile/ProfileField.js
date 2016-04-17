import React from 'react'
import { Input } from 'react-bootstrap';


class ProfileField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount() {
    this.setState({value: this.props.fieldDetails.value})
  }

  handleFormChange () {
    var {id} = this.props.fieldDetails
    var formValue = this.refs.input.refs.input.value;

    this.setState({value: formValue});
    this.props.stageProfileEdits((editedObject) => {
      editedObject.userInfo[id] = {
        id: id,
        value: formValue
      }
    });
  }
  renderProfileField() {
    var editing = this.props.editing;
    var {title, id} = this.props.fieldDetails
    var value = this.state.value;


    //If your not editing the profile and it has a value
    //
    if(!editing && value) {
      var formattedValue = value.split('\n').map((paragraph, key) =>  {
        return <span key={key}>{paragraph}<br/></span>;
      });

      return (
        <div key={id}>
          <h3>{title}</h3>
          <p>{formattedValue}</p>
        </div>
      );
    }

    else if(editing) {
      return (
        <div key={id}>
          <h3>{title}</h3>
          <Input type="textarea"
            value={value}
            ref='input'
            onChange={this.handleFormChange.bind(this)} />
        </div>
      );
    } else {
      return (<div></div>)
    }
  }

  render() {
    return (
      this.renderProfileField()
    );
  }
}

module.exports = ProfileField;
