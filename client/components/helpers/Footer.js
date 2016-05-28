import React from 'react'
var _shuffle = require('lodash/shuffle');

var OriginalTeam = [
  {name: 'Matt', url:'https://www.linkedin.com/in/mwbresnan'},
  {name: 'Alamu', url:'https://www.linkedin.com/in/alamu'},
  {name: 'Drake', url:'https://www.linkedin.com/in/yochess'},
  {name: 'Jonas', url:'https://www.linkedin.com/in/mikejonas'},
];

class Footer extends React.Component {

  DisplayTheTeamFairlySinceEveryoneWantsToBeListedFirst() {
    return _shuffle(OriginalTeam).map((person, index) => {
      var randomlySorted;
      return (
        <span key={person.name}>
          {index === 3 ? 'and ' : ''}
          <a href={person.url} target="_blank">{person.name}</a>
          {index < 3 ? ', ': ''}
        </span>
      )
    });

  }

  render() {
    return (
      <div id="footer">
        Built in HR40 by {this.DisplayTheTeamFairlySinceEveryoneWantsToBeListedFirst()}
      </div>
    );
  }
}

module.exports = Footer;
