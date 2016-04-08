import React from 'react'
import Reflux from 'reflux'
import Router from 'react-router'
import mixins from 'es6-mixins'

import AuthStore from '../stores/AuthStore'
import AuthActions from '../actions/AuthActions'



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = AuthStore.getInitialState();
    mixins([/*Router.State, Router.Navigation,*/ Reflux.connect(AuthStore, 'user'), Reflux.ListenerMixin], this);
  }

  componentDidMount() {
    this.listenTo(AuthStore, this._OnAuthChange)
  }

  // getInitialState() {
  //   return {};
  // }

  _OnAuthChange(auth) {
    this.setState(auth);
    if(this.state.loggedIn) {
      var redirectUrl = this.getQuery().redirect || '/';
      this.replaceWith(redirectUrl);
    }
  }

  _handleSubmit(event) {
    event.preventDefault();
    AuthActions.login(React.findDOMNode(this.refs.email).value, React.findDOMNode(this.refs.password).value);
  }



  render() {
    var errorMessage;
    if(this.state.error) {
      errorMessage = (
        <div className='state-error' style={{ paddingBottom: 16 }}>
          { this.state.error }
        </div>
        );
    }

    var formContent;
    if(this.state.user) {
      formContent = (
        <div>
          <p>
            You're logged in as <strong>{ this.state.user.name }</strong>.
          </p>
        </div>

      );
    } else {
      formContent = (
        <div>
          { errorMessage }
          Email: <input defaultValue="DonaldTrump@MakeAmericaGreatAgain.com" ref="email" style={{ maxWidth: "150%" }} type="email" />
          <br/>
          Password: <input defaultValue="DonaldTrump" ref="password" style={{ maxWidth: "150%" }} type="password" />
          <br/>
          <button onClick={ this.handleLogout }>Log In</button>
        </div>
      );


    return (
      <div>
      <form onSubmit={this._handleSubmit}>
         {formContent}
      </form>
      </div>
    );
  }
}
}


module.exports = Login;
