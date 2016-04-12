import React from 'react';
import NavLink from '../NavLink'

import { Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" onlyActiveOnIndex>Hack Reactor</NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <Navbar.Text><NavLink to="/users">Users</NavLink></Navbar.Text>
        </Nav>
        <Nav pullRight>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <MenuItem><NavLink to="/logout">Log out</NavLink></MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

module.exports = NavigationBar;
