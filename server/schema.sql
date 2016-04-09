/** Make sure to create (or re-create) the database 
 *  before running this code. To do this, run:
 *
 *  $ mysql -u root < server/schema
 *
 *  Note: Change password if necessary.
 *  Also at the bottom are dummy variables to 
 *  populate the table. 
**/

drop database if exists alumConnectTest;
create database alumConnectTest;

use alumConnectTest;

create table Groups (
  id int not null auto_increment,
  group_name varchar(255),
  primary key(id)
);

create table Users (
  id int not null auto_increment,
  username varchar(255),
  password varchar(255),
  email varchar(255),
  url_hash varchar(255),
  public int,
  permission int,
  group_id int not null,
  primary key(id),
  foreign key(group_id) references Groups(id)
);

create table Networks (
  id int not null auto_increment,
  network_name varchar(255),
  username varchar(255),
  user_id int not null,
  primary key(id),
  foreign key(user_id) references Users(id)
);

create table Bios (
  id int not null auto_increment,
  name varchar(1023),
  before_hr varchar(1023),
  location varchar(1023),
  interest varchar(1023),
  experience varchar(1023),
  fun_fact varchar(1023),
  user_id int not null,
  primary key(id),
  foreign key(user_id) references Users(id)
);

insert into Groups
(group_name) 
values 
('HR40'),
('HR41');

insert into Users 
(username, password, email, url_hash, public, permission, group_id) 
values
('Jonas', 'aaaaaa', 'j@mail.com', 'x2y2z2', 0, 0, 1),
('Matt', 'bbbbbb', 'm@mail.com', 'i3j3k3', 0, 0, 1),
('Alamu', 'cccccc', 'a@mail.com', 'n3m3o3', 0, 0, 1),
('Drake', 'aaaaaa', 'd@mail.com', 'a1b1c1', 0, 0, 1);

insert into Networks
(network_name, username, user_id)
values
('facebook', 'dungeonMaster', 2),
('twitter', 'notADungeonMaster', 2),
('facebook', 'jonasBrothers', 1);

insert into Bios
(name, before_hr, location, interest, experience, fun_fact, user_id)
values
(
  "matt Bresnan", 
  "Two years ago I moved from Virginia to LA to start working at Accenture as a security technology consultant. I had planned to take a leave of absence for a few months to study python until one of my coworkers told me about HR. This was about 6 months ago. Ever since then I've been studying, and eventually took the leave so I could focus on getting admitted into the program. I quickly noticed that 'full time' studying actually just means a little bit of studying, and a lot of Netflix.",
  "I relocated back home to VA temporarily, but I've been in LA for the past two years.",
  "I've always wanted to get into programming, but never fully committed to learning. This past year I finally decided it was time to pick up a new skill set, because I was getting really bored of technology consulting. Some of my tech interest are cyber security, data mining, and machine learning. After my programming skills are better I also want to learn as much as I can about making hardware.",
  "I majored in IT in college, and took a few entry level classes for java and php. Since then I've taken java, C++, JS, and python classes online, which were all way more informative than what I learned in college. I picked up basic level linux commands at work since we use oracle's security suite for installs/configs/administration.",
  "I love to travel and experience new cultures and food. Like a few other people in the cohort I also scuba dive! After I saw Men of Honor I was always inspired to get my scuba cert one day. When I'm not studying I'm either at the gym, eating, cooking, or doing something else fitness related. I'm obsessed with fitness, and would like to eventually get into competing or fitness modeling.",
  1
),
(
  "Hi everyone, I'm Jonas. My full name is Mike Jonas, but everyone calls me Jonas, so that's usually how I introduce myself.",
  "Most of my Teens and 20's have revolved around riding BMX!  Initially I played online poker to support myself, but then moved into making websites which Is way more fulfilling and enjoyable. I've worked on my own sites and have done freelance for other people.\n\nDespite working with websites for the past 10 years, I never truly learned how to program! I mostly used frameworks to get things done. More recently I learned swift with the goal of making an app(still a work in progress). But the more I've been learning, the more I realized how little I know. This led me to applying to hack reactor!",
  "San Diego. I'm original from long island, but I have also lived in Berkeley for a few years. ",
  "I'm really into the idea of working on a startup or a cool product of some kind. Less interested in working for a larger company.",
  "Most of my experience with development is with everything outside of pure programming. I can theme up a website from scratch and I have experience with PHP and MYSQL, but mostly within the constraints of frameworks like Wordpress and Drupal. Swift is the first language I learned and built stuff with from the ground up. I've dabbled around with other languages like javascript, python, c++.",
  "* I'm pretty healthy and active -- I ride BMX, do yoga, and enjoy hiking and camping among other things.\n* Bojack Horseman and Rick and Morty are two of my favorite Cartoons. I also love watching Game of Thrones and Silicon Valley.\n* Ice cream is my favorite food.",
  2
),
(
  "My preferred name is Alamu (al like in alarm - a - moo). My last name is Palaniappan. ",
  " I am a mother of a 3 year old boy. So for the past three years, my life has been just around him. I take care of Marketing & Communications at his preschool. Before him, I used to work for Novell in India as a Software Developer for a couple of years. I must agree that I had a lot of fun coding then.",
  "I currently live in San Jose. It's been 5 years since I moved here. I grew up in India. ",
  " The process of programming solutions to a problem by itself is quite intriguing to me. I am interested in Cloud computing and virtualization. I am also interested in visualization and user experience.",
  "Mostly C and a little bit of Java and Perl.",
  "I love to cook, especially desserts. I like to do yoga. I also love to paint, anything to do with arts and crafts.",
  3
),
(
  "Hi, my name is Drake Wang.",
  "I've been playing professional poker for 6 years. Ever since I turned 21, I've spent every month of June and sometimes July in Las Vegas for the World Series of Poker. I graduated from CalPoly San Luis Obispo in 2011 with a degree in economics.",
  "I was born and raised in San Francisco. Currently I live near Golden Gate Park.",
  "Not sure...",
  "I first heard about coding bootcamps in 2013. This led me to dabble a little in ruby. The interest was however short-lived before sparking back up again last Fall. I dabbled a little more into coding by taking courses in ruby, mysql, and java at CCSF. Currently I am trying to expand my knowledge in HTML and algorithms.",
  "I've played a lot of competitive chess growing up. The obsession finally ended when I achieved my goal of becoming a national master. I love puzzles and games in general, pretty much anything along the line of connect 4 and backgammon. I like to look at and analyze different strategies in all types of games.",
  4
)