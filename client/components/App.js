import React from 'react'
import { Link } from 'react-router'

class App extends React.Component {
  render() {
    return(
      <div>
        <h2>Website title</h2>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
        {this.props.children}

      </div>
    );
  }
}

module.exports = App;
