import React from 'react'
import { Link } from 'react-router'
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
        <div><Link to='/dashboard/users'>{this.state.userCount} users</Link></div>
      </div>
    );
  }
}

module.exports = DashboardHome;
