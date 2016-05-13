import React from 'react'
import auth from '../../util/authHelpers.js'
import NavigationBar from '../helpers/NavigationBar.js'
import { Grid } from 'react-bootstrap';
import RestHandler from '../../util/RestHandler.js'

class App extends React.Component {

  render() {
    return (
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
