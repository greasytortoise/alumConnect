import React from 'react'
import Griddle from 'griddle-react'
import RestHandler from '../../util/RestHandler';
import $ from 'jquery';
import request from 'superagent';

var rowMetadata = {
    "bodyCssClassName": function(rowData) {
        if (rowData.action === "added") {
            return "green-row";
        } else if (rowData.action === "removed") {
            return "red-row";
        } else if (rowData.action === "transfer") {
            return "blue-row";
        }
        return "default-row";
    }
};

class DashboardUsers extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      users: []

    }
  }

  componentWillMount() {
    RestHandler.Get('/db/users', (err, res) => {
      var users = res.body;
      for(var user in users) {
        console.log(user);
        users[user].link = this.getLink(users[user].id);
      }
      this.setState({users: users});

    });
  }
  
  getLink(id) {
    console.log(this);
    return (
      <div data={id} onClick={this.deleteUser.bind(this)}>
        Delete User
      </div>
    );
  }

  deleteUser(e) {
    var targetId = $(e.target).attr('data');
    e.preventDefault();
    request
      .delete('/db/users/user/' + targetId)
      .end(function(err, res) {
        if(err) {
          console.log(err)
        } else {
          console.log('User deleted');
          
        }
      });
  }

  render() {
    return(
      <div>
        <h3 className="dashboard-title">Users</h3>
        <Griddle
          results={this.state.users}
          rowMetadata={rowMetadata}
          showFilter={true}
          ref='usertable'
          tableClassName='table'
          useGriddleStyles={false}
          resultsPerPage={25}
          columns={["name", "email", "group", "id", "link"]}/>
      </div>
    );
  }
}

module.exports = DashboardUsers;
