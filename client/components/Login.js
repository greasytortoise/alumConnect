import React from 'react';
import {Router, Link} from 'react-router';
import { Grid, Button } from 'react-bootstrap';
import Footer from './helpers/Footer.js'

const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    document.body.classList.add('page-login');
    localStorage.removeItem('selectedGroup');
  },
  componentWillUnmount(){
    document.body.classList.remove('page-login');
  },
  getInitialState() {
    return { error: false }
  },

  handleSubmit(event) {
    event.preventDefault();
    window.location.href = '/auth';
  },

  render() {
    return (
      <div id='loginFormWrapper'>
        <form id='loginForm' onSubmit={this.handleSubmit}>
          <img className="image" src='../assets/logo.png' />

          <h3>Student Network</h3>
          <Button bsStyle="primary" bsSize="large" type="submit" block>Log in with Github</Button>

        </form>

        <Footer />
      </div>
    );
  }
})




module.exports = Login;
