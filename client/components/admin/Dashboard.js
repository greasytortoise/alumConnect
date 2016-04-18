import React from 'react'
import { Grid } from 'react-bootstrap'
import Sidebar from '../helpers/Sidebar'
import NavigationBar from '../helpers/NavigationBar.js'



class Dashboard extends React.Component {
  render() {
    return(
      <div id="wrapper">
        <NavigationBar isAdminBar={true}/>
        <Sidebar />
        <div id="main">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              {this.props.children}
            </div>
          </div>
        </div>

      </div>

    );
  }
}

module.exports = Dashboard;
