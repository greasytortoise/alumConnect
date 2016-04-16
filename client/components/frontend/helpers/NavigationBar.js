import React from 'react';
import NavLink from './NavLink'
import $ from 'jquery'

import { Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';


  $(document).on('click', '.navbar-toggle', function(event) {
    $(this).parent().parent().find('.dropdown').addClass('open');
  })
  $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
      if (_opened === true && !clickover.hasClass("navbar-toggle")) {
          $("button.navbar-toggle").click();
      }
  });


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

          {/*<Nav>
            <Navbar.Text><NavLink to="/users">Students</NavLink></Navbar.Text>
          </Nav>*/}

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
