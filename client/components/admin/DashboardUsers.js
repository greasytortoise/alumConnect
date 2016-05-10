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
      users: [],
      key: 666
    }
  }

  componentWillMount() {
    RestHandler.Get('/db/users', (err, res) => {
      var users = res.body;
      for(var i = 0; i < users.length; i++) {
        users[i].link = this.getLink(users[i].id, i);
      }
      this.setState({users: users});

    });
  }
  
  getLink(id) {
    return (
      <div data={id} onClick={this.deleteUser.bind(this)}>
        Delete User
      </div>
    );
  }

  deleteUser(e) {
    var that = this;
    var data = $(e.target).attr('data');
    e.preventDefault();
    request
      .delete('/dashboard/db/users/user/' + data)
      .end(function(err, res) {
        if(err) {
          console.log(err)
        } else {
          console.log('User deleted');
          for (var i = 0; i < that.state.users.length; i++) {
            if (that.state.users[i].id == data) {
              that.state.users.splice(i, 1);
              break;
            }
          }
          that.setState({ key: Math.random() });
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
          key={this.state.key}
          ref='usertable'
          tableClassName='table'
          useGriddleStyles={false}
          resultsPerPage={25}
          columns={["id", "name", "email", "link"]}/>
      </div>
    );
  }
}

module.exports = DashboardUsers;
