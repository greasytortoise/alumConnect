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
          <h2>Website title</h2>

          {this.props.children}
        </div>
      </Grid>
    );
  }
}

module.exports = App;
