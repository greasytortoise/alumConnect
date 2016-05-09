import React from 'react'
import Griddle from 'griddle-react'
import RestHandler from '../../util/RestHandler';

class DashboardUsers extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    RestHandler.Get('/db/users', (err, res) => {
      this.setState({users: res.body})
    });
  }

  render() {
    return(
      <div>
        <h3 className="dashboard-title">Users</h3>
        <Griddle
          results={this.state.users}
          showFilter={true}
          tableClassName='table'
          useGriddleStyles={false}
          resultsPerPage={25}
          columns={["name", "email", "group", "id"]}/>
      </div>
    );
  }
}

module.exports = DashboardUsers;
