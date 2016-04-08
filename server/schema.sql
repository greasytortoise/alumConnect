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
  group_id int,
  primary key(id),
  foreign key(group_id) references Groups(id)
);

create table Networks (
  id int not null auto_increment,
  network_name varchar(255),
  username varchar(255),
  user_id int,
  primary key(id),
  foreign key(user_id) references Users(id)
);

create table Bios (
  id int not null auto_increment,
  lorem varchar(255),
  ipsum varchar(255),
  dolor varchar(255),
  sit varchar(255),
  user_id int,
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


/* Execute this file from the command line by typing:
 * mysql -u root < server/schema.sql
 * to create the database and the tables. */