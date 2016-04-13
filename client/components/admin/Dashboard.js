import React from 'react'
import { Grid } from 'react-bootstrap';


class Dashboard extends React.Component {
  render() {
    return(
      <div id="wrapper">

        <ul role="nav">
          {/*<li><NavLink to="/dashboard" onlyActiveOnIndex>Dashboard</NavLink></li>
          <li><NavLink to="/dashboard/users">users</NavLink></li>*/}
        </ul>
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <a href="#">
                Start Bootstrap
              </a>
            </li>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Shortcuts</a>
            </li>
            <li>
              <a href="#">Overview</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

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
