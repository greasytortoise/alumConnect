var React = require('react');
var Griddle = require('griddle-react');
var request = require('superagent');

class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    request
      .get('/db/users')
      .end((err, res) => {
        this.setState({users: res.body})
      });
  }

  render() {
    console.log(this.state.users);
    return(
      <div>
        <h2>Users</h2>
        <Griddle
          results={this.state.users}
          showFilter={true}
          columns={["id", "username", "email", "group_id", "public"]}/>
      </div>
    );
  }
}

module.exports = Dashboard;
