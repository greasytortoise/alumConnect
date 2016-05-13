import React from 'react'
import { Input, Button } from 'react-bootstrap';


class ProfileGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  componentDidMount() {
    this.setState({groups: this.props.groups})
  }

  renderProfileSite() {
    var editing = this.props.editing;
    var groups = this.state.groups;

    if(!editing && groups) {
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
