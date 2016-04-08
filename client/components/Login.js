import React from 'react';
import Router from 'react-router';
import auth from '../authHelpers.js';

const Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" placeholder="DonaldTrump@MakeAmericaGreatAgain.com" /></label>
        <label><input ref="pass" placeholder="password" type='password' /></label>
        <button type="submit">login</button>
        {this.state.error && (
          <p>HANDS TOO SMALL!</p>
        )}
      </form>
    );
  }
})



module.exports = Login;
