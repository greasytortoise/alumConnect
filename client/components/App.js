import React from 'react'
import { Link } from 'react-router'

// export default React.createClass({
//   render() {
//     return <div>Hello, React Router!</div>
//   }
// });

class App extends React.Component {
  render() {
    return(
      <div>
        <h2>Website title</h2>
        <ul role="nav">
          <li><Link to="/User">go to /user</Link></li>
        </ul>

        {/* add this */}
        {this.props.children}

      </div>
    );
  }
}

module.exports = App;
