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

/* Execute this file from the command line by typing:
 * mysql -u root < server/schema.sql
 * to create the database and the tables. */