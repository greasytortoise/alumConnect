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
  name varchar(63),
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
('HR40');

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
  'matt Bresnan', 
  "Two years ago I moved from Virginia to LA to start working at Accenture as a security technology consultant. I had planned to take a leave of absence for a few months to study python until one of my coworkers told me about HR. This was about 6 months ago. Ever since then I've been studying, and eventually took the leave so I could focus on getting admitted into the program. I quickly noticed that 'full time' studying actually just means a little bit of studying, and a lot of Netflix.",
  "I relocated back home to VA temporarily, but I've been in LA for the past two years.",
  "I've always wanted to get into programming, but never fully committed to learning. This past year I finally decided it was time to pick up a new skill set, because I was getting really bored of technology consulting. Some of my tech interest are cyber security, data mining, and machine learning. After my programming skills are better I also want to learn as much as I can about making hardware.",
  "I majored in IT in college, and took a few entry level classes for java and php. Since then I've taken java, C++, JS, and python classes online, which were all way more informative than what I learned in college. I picked up basic level linux commands at work since we use oracle's security suite for installs/configs/administration.",
  "I love to travel and experience new cultures and food. Like a few other people in the cohort I also scuba dive! After I saw Men of Honor I was always inspired to get my scuba cert one day. When I'm not studying I'm either at the gym, eating, cooking, or doing something else fitness related. I'm obsessed with fitness, and would like to eventually get into competing or fitness modeling.",
  1
);


/* Execute this file from the command line by typing:
 * mysql -u root < server/schema.sql
 * to create the database and the tables. */