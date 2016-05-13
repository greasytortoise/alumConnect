import React from 'react'
import { Input, Button } from 'react-bootstrap';


class ProfileGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedGroups: [],
    };
  }

  componentDidMount() {
    this.setState({value: this.props.siteDetails.value})
  }

  renderProfileSite() {
    var editing = this.props.editing;
    var value = this.state.value;

    if(!editing && value) {
      return (
        <div>not editing</div>
      );
    }
    else if(editing) {
      return (
        <div>editing</div>
      );
    } else {
      return(<div>else</div>)
    }
  }

  render() {
    console.log(this.props.groups);
    return (
      this.renderProfileSite()
    )
  }
}

module.exports = ProfileGroups;
