import React from 'react'

class Bio extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      edit: 0
    }
  }

  render() {
    return (
      <div>
        <h3>What have you been up to before HackReactor?</h3>
        <p>{this.props.before_hr}</p>

        <h3>What city are you coming from to be here at  ?  </h3>
        <p>{this.props.location}</p>

        <h3>Tech interests?</h3>
        <p>{this.props.interest}</p>

        <h3>Coding experience?</h3>
        <p>{this.props.experience}</p>

        <h3>Fun random stuff?</h3>
        <p>{this.props.fun_fact}</p>

      </div>
    );
  }
}

module.exports = Bio;