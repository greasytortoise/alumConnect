import React from 'react'
import { Grid } from 'react-bootstrap'
import Sidebar from './helpers/Sidebar'


class Dashboard extends React.Component {
  render() {
    return(
      <div id="wrapper">

        <Sidebar />

        <div id="page-content-wrapper">
          <div className="container-fluid">
            {this.props.children}
          </div>
        </div>

      </div>

    );
  }
}

module.exports = Dashboard;
