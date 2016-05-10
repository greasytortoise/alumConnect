import React from 'react'
import { Link } from 'react-router'
import { Alert } from 'react-bootstrap';
import RestHandler from '../../util/RestHandler';

class DashboardHome extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userCount: undefined
    }
  }

  componentDidMount() {
    RestHandler.Get('/db/users', (err, res) => {
      this.setState({userCount: res.body.length})
    });
  }

  render() {
    return(
      <div>
        <Alert bsStyle='success'>
          <strong>It Works!</strong> good job you are ready 
        </Alert>
        <div><Link to='/dashboard/users'>{this.state.userCount} users</Link></div>
      </div>
    );
  }
}

module.exports = DashboardHome;
