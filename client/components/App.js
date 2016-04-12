import React from 'react'
import auth from '../authHelpers.js'
import NavLink from './NavLink'
import NavigationBar from './helpers/NavigationBar.js'
import { Grid } from 'react-bootstrap';

class App extends React.Component {

  render() {
    return(
      <Grid>
        <NavigationBar />
        <div id="main">
          {this.props.children}
        </div>
      </Grid>
    );
  }
}

module.exports = App;
