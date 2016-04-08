import React from 'react'
import { Link } from 'react-router'

class App extends React.Component {
  render() {
    return(
      <div>
        <h2>Website title</h2>
        <ul role="nav">
          <li><Link to="/u">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
        {this.props.children}

      </div>
    );
  }
}

module.exports = App;




// var React = require('react');
// var Router = require('react-router');
// var { Route, RouteHandler, Link } = Router;

// class App extends React.Component {
//   constructor () {
//     super();
//     this.state = {
//       loggedIn: auth.loggedIn()
//     };
//   }

//   setStateOnAuth (loggedIn) {
//     this.setState({
//       loggedIn: loggedIn
//     });
//   }

//   componentWillMount () {
//     auth.onChange = this.setStateOnAuth.bind(this);
//     auth.login();
//   }

//   render () {
//     return (
//       <div>
//         <ul>
//           <li>
//             {this.state.loggedIn ? (
//               <Link to="logout">Log out</Link>
//             ) : (
//               <Link to="login">Sign in</Link>
//             )}
//           </li>
//         </ul>
//         <RouteHandler/>
//       </div>
//     );
//   }
// }

// var routes = (
//   <Route handler={App}>
//     <Route name="login" handler={Login}/>
//     <Route name="logout" handler={Logout}/>
//     <Route name="about" handler={About}/>
//     <Route name="dashboard" handler={Dashboard}/>
//   </Route>
// );

// Router.run(routes, function (Handler) {
//   React.render(<Handler/>, document.getElementById('example'));
// });
