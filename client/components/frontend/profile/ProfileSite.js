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
    var {id, site_name, url} = this.props.siteDetails
    var formValue = this.refs.input.refs.input.value || '';
    this.setState({value: formValue});
    this.props.stageProfileEdits((editedObject) => {
      editedObject.sites[id] = {
        id: id,
        value: formValue
      }
    });
  }
  renderProfileSite() {
    // this.props.siteDetails = ~ {id: 4, name: "github", url: "https://www.github.com/", value: "mbresnan1701"}
    var editing = this.props.editing;
    var {id, site_name, base_url} = this.props.siteDetails
    var value = this.state.value;
    var userUrl = <a href={`${base_url}${value}`}>{value}</a>

    if(!editing && value) {
      return (
        <div>{site_name}: {userUrl}</div>
      );
    }
    else if(editing) {
      return (
        <div key={id}>
          <Input type="text"
            addonBefore={base_url}
            value={value}
            ref="input"
            onChange={this.handleFormChange.bind(this)}/>
        </div>
      );
    } else {
      return(<div></div>)
    }



  }

  render() {
    return (
      this.renderProfileSite()
    );
  }
}

module.exports = ProfileSite;
