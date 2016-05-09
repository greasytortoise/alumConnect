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
  
  getLink(id, index) {
    var info = JSON.stringify({id: id, index: index});
    return (
      <div data={info} onClick={this.deleteUser.bind(this)}>
        Delete User
      </div>
    );
  }

  deleteUser(e) {
    var that = this;
    var data = JSON.parse($(e.target).attr('data'));
    e.preventDefault();
    request
      .delete('/db/users/user/' + data.id)
      .end(function(err, res) {
        if(err) {
          console.log(err)
        } else {
          console.log('User deleted');
          that.state.users.splice(parseInt(data.index), 1);
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
          columns={["name", "email", "group", "id", "link"]}/>
      </div>
    );
  }
}

module.exports = DashboardUsers;
