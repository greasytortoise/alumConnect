import React from 'react'
import { Input } from 'react-bootstrap';


class Bio extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBioDetails() {
    var {title, content} = this.props.bioDetails
    var editing = this.props.editing;

    if(!editing) {
      return (
        <div key={title}>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      );
    }

    else {
      return (
        <div key={title}>
          <h3>{title}</h3>
          <p>
            {/*<textarea ref="val" onChange={this.handleChange.bind(this)} value={this.state.content} />            */}
            <Input type="textarea" value={content} />

          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>{this.renderBioDetails()}</div>
    );
  }
}

module.exports = Bio;
