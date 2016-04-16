import React from 'react'
import { Input, Button } from 'react-bootstrap';


class ProfileSite extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount() {
    this.setState({value: this.props.siteDetails.value})
  }

  handleFormChange () {
    var {id, name, url} = this.props.siteDetails
    var formValue = this.refs.input.refs.input.value || '';
    this.setState({value: formValue});
    this.props.stageProfileEdits((editedObject) => {
      editedObject.sites.id = {
        id: id,
        name: name,
        url: url,
        value: formValue
      }
    });
  }
  renderProfileSite() {
    // this.props.siteDetails = ~ {id: 4, name: "github", url: "https://www.github.com/", value: "mbresnan1701"}
    var editing = this.props.editing;
    var {id, name, url} = this.props.siteDetails
    var value = this.state.value;
    var userUrl = <a href={`${url}${value}`}>{value}</a>

    if(!editing) {
      return (
        <div key={id}>
          <p>{name}: {userUrl}</p>
        </div>
      );
    }
    else {

      return (
        <div key={id}>
          <Input type="text"
            addonBefore={url}
            value={value}
            ref="input"
            onChange={this.handleFormChange.bind(this)}/>
        </div>
      );
    }



  }

  render() {
    return (
      this.renderProfileSite()
    );
  }
}

module.exports = ProfileSite;
