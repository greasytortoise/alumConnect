import React from 'react'
import Bio from './helper/bioDetails.js'
import Image from './helper/Image.js'

import { Link } from 'react-router'

class Profile extends React.Component {

  constructor (props) {
    super (props);

    this.state = {
      image: 'Hello',
      bioDetails: null,
      editing: 0
    };
  }

  componentDidMount() {
    this._getUserProfile();
  }

  _getUserProfile() {
    //ajax request to get image and bioDetaills of the user /db/users/id
    this.setState({
      image: "../mockups/assets/donaldtrump.png",
      bioDetails: {
        id: 1,
        name: "matt Bresnan",
        before_hr: "Two years ago I moved from Virginia to LA to start working at Accenture as a security technology consultant. I had planned to take a leave of absence for a few months to study python until one of my coworkers told me about HR. This was about 6 months ago. Ever since then I've been studying, and eventually took the leave so I could focus on getting admitted into the program. I quickly noticed that 'full time' studying actually just means a little bit of studying, and a lot of Netflix.",
        location: "I relocated back home to VA temporarily, but I've been in LA for the past two years.",
        interest: "I've always wanted to get into programming, but never fully committed to learning. This past year I finally decided it was time to pick up a new skill set, because I was getting really bored of technology consulting. Some of my tech interest are cyber security, data mining, and machine learning. After my programming skills are better I also want to learn as much as I can about making hardware.",
        experience: "I majored in IT in college, and took a few entry level classes for java and php. Since then I've taken java, C++, JS, and python classes online, which were all way more informative than what I learned in college. I picked up basic level linux commands at work since we use oracle's security suite for installs/configs/administration.",
        fun_fact: "I love to travel and experience new cultures and food. Like a few other people in the cohort I also scuba dive! After I saw Men of Honor I was always inspired to get my scuba cert one day. When I'm not studying I'm either at the gym, eating, cooking, or doing something else fitness related. I'm obsessed with fitness, and would like to eventually get into competing or fitness modeling.",
        user_id: 1
      }
    });
  }

  _handleEditProfileClick(event, bioDetails) {
    event.preventDefault();
    this.setState({
      editing: 1,
      bioDetails: {
        id: 1,
        name: "matt Bresnan",
        before_hr: "I moved from Virginia to LA to start working at Accenture as a security technology consultant. I had planned to take a leave of absence for a few months to study python until one of my coworkers told me about HR. This was about 6 months ago. Ever since then I've been studying, and eventually took the leave so I could focus on getting admitted into the program. I quickly noticed that 'full time' studying actually just means a little bit of studying, and a lot of Netflix.",
        location: "I relocated back home to VA temporarily, but I've been in LA for the past two years.",
        interest: "I've always wanted to get into programming, but never fully committed to learning. This past year I finally decided it was time to pick up a new skill set, because I was getting really bored of technology consulting. Some of my tech interest are cyber security, data mining, and machine learning. After my programming skills are better I also want to learn as much as I can about making hardware.",
        experience: "took a few entry level classes for java and php. Since then I've taken java, C++, JS, and python classes online, which were all way more informative than what I learned in college. I picked up basic level linux commands at work since we use oracle's security suite for installs/configs/administration.",
        fun_fact: "Love to travel and experience new cultures and food. Like a few other people in the cohort I also scuba dive! After I saw Men of Honor I was always inspired to get my scuba cert one day. When I'm not studying I'm either at the gym, eating, cooking, or doing something else fitness related. I'm obsessed with fitness, and would like to eventually get into competing or fitness modeling.",
        user_id: 1
      }
    });
  }

  _handleChangeImage(event, image) {
    event.preventDefault();
    this.setState({
      editing: 1,
      image: image
    });
  }

  render() {
    return (
      <div>
        <h3>Preferred name</h3>
        <p>The Donald Trump</p>
        
        <Image image={this.state.image}/>

        <Bio bioDetails={this.state.bioDetails} 
          />

      </div>
    );
  }
}

module.exports = Profile;


// handleChangeImage={this._handleChangeImage.bind(this)}
//handleEditProfileClick={this._handleProfileChange.bind(this)}

// _handleProfileChange(event) {
//   event.preventDefault();
//   console.log(this.refs.val.value);
//   this.setState({value: this.refs.val.value});
// }

// if(this.state.editing === 0) {
//       return (
//         <div>
//           <Link to="/edit" onClick={this._handleEditProfileClick.bind(this)}>Edit Profile</Link>
//           <h3>Preferred name</h3>
//           <p>The Donald</p>
//           <img src={"../mockups/assets/donaldtrump.png"} className="photo" />

//           <h3>What have you been up to before HackReactor?</h3>
//           <p>Two years ago I moved from Virginia to LA to start working at Accenture as a security technology consultant. I had planned to  take a leave of absence for a few months to study python until one of my coworkers told me about HR. This was about 6  months ago. Ever since then I've been studying, and eventually took the leave so I could focus on getting admitted into the  program. I quickly noticed that "full time" studying actually just means a little bit of studying, and a lot of Netflix.</p>

//           <h3>What city are you coming from to be here at  ?  </h3>
//           <p>I relocated back home to VA temporarily, but I've been in LA for the past two years.</p>

//           <h3>Tech interests?</h3>
//           <p>I've always wanted to get into programming, but never fully committed to learning. This past year I finally decided it was time to pick up a new skill set, because I was getting really bored of technology consulting. Some of my tech interest are cyber security, data mining, and machine learning. After my programming skills are better I also want to learn as much as I can about making hardware.</p>

//           <h3>Coding experience?</h3>
//           <p>I majored in IT in college, and took a few entry level classes for java and php. Since then I've taken java, C++, JS, and python classes online, which were all way more informative than what I learned in college. I picked up basic level linux commands at work since we use oracle's security suite for installs/configs/administration.</p>

//           <h3>Fun random stuff?</h3>
//           <p>I love to travel and experience new cultures and food. Like a few other people in the cohort I also scuba dive! After I saw Men of Honor I was always inspired to get my scuba cert one day. When I'm not studying I'm either at the gym, eating, cooking, or doing something else fitness related. I'm obsessed with fitness, and would like to eventually get into competing or fitness modeling.</p>

//         </div>
//       );
//     } else {
//       return(
//         <input ref="val" value={this.state.value} onChange={this._handleProfileChange.bind(this)}/>
//       );      
//     }
