import React from 'react'
import auth from '../authHelpers.js'
import NavLink from './NavLink'
import NavigationBar from './helpers/NavigationBar.js'
import { Grid } from 'react-bootstrap';


class App extends React.Component {
  render() {
    return(
      <Grid>
        <h2>Website title</h2>
        <NavigationBar />

        {this.props.children}

      </Grid>
    );
  }
}

module.exports = App;
