import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>users</h2>
          <ul>
            <li><Link to="/users/donaldtrump">Donald Trump</Link></li>
            <li><Link to="/users/mattBresnan">Matt Bresnan</Link></li>
            <li><Link to="/users/donaldtrump">Donald Trump</Link></li>
            <li><Link to="/users/mattBresnan">Matt Bresnan</Link></li>
            <li><Link to="/users/donaldtrump">Donald Trump</Link></li>
            <li><Link to="/users/mattBresnan">Matt Bresnan</Link></li>
          </ul>
      </div>
    )
  }
})
