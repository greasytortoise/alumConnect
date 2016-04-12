import React from 'react';
import NavLink from './NavLink'

import { Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" onlyActiveOnIndex>Hack Reactor</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle animation={false} />
        </Navbar.Header>
        <Navbar.Collapse>

          <Nav>
            <Navbar.Text><NavLink to="/users">Students</NavLink></Navbar.Text>
          </Nav>

          <Nav pullRight>
            <NavDropdown title="Drake Wang" id="nav-dropdown">
              <MenuItem header><NavLink to="/logout">Edit profile</NavLink></MenuItem>
              <MenuItem header><NavLink to="/logout">Log out</NavLink></MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

module.exports = NavigationBar;
