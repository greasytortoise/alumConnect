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

-- It seems like the front-end is based off of group_id here currently

create table Users (
  id int not null auto_increment,
  username varchar(255),
  password varchar(255),
  email varchar(255),
  image varchar(255),
  url_hash varchar(255),
  public int,
  permission int,
  Group_id int not null, -- NEEDS TO BE REMOVED
  primary key(id),
  foreign key(Group_id) references Groups(id) -- NEEDS TO BE REMOVED
);

create table Groups_Users ( -- NEW MANY-MANY TABLE
  id int not null auto_increment,
  Group_id int not null,
  User_id int not null,
  primary key(id),
  foreign key(Group_id) references Groups(id),
  foreign key(User_id) references Users(id)
);

create table Sites (
  id int not null auto_increment,
  site_name varchar(255),
  base_url varchar(255),
  active int,
  primary key(id)
);

create table User_Sites (
  id int not null auto_increment,
  rest_url varchar(255),
  User_id int not null,
  Site_id int not null,
  primary key(id),
  foreign key(User_id) references Users(id),
  foreign key(Site_id) references Sites(id)
);

create table Bio_Fields (
  id int not null auto_increment,
  title varchar(255),
  primary key(id)
);

create table Bios (
  id int not null auto_increment,
  bio varchar(2047),
  User_id int not null,
  Bio_Field_id int not null,
  primary key(id),
  foreign key(User_id) references Users(id),
  foreign key(Bio_Field_id) references Bio_Fields(id)
);


insert into Groups
  (group_name)
values
  ('staff'),
  ('test group');

insert into Users -- Group_id needs to be removed
  (username, password, email, image, url_hash, public, permission, Group_id)
  -- (username, password, email, image, url_hash, public, permission)
values
  ('Admin', '$2a$10$OJDiRQNkpHyyoi4CC546ZejIhMpRXsI86/tbBr74vsZEN4qtquA5y', 'admin@admin.com', '/assets/photos/trump.jpg', 'ndas2q', 0, 1, 1);
  -- ('Admin', '$2a$10$OJDiRQNkpHyyoi4CC546ZejIhMpRXsI86/tbBr74vsZEN4qtquA5y', 'admin@admin.com', '/assets/photos/trump.jpg', 'ndas2q', 0, 1);

insert into Groups_Users -- new addition
  (user_id, group_id)
values
  (1, 1),
  (1, 2);

insert into Sites
  (site_name, base_url, active)
values
  ('facebook', 'https://www.facebook.com/', 1),
  ('twitter', 'https://www.twitter.com/', 1),
  ('linkedin','https://www.linkedin.com/in/', 1),
  ('github', 'https://www.github.com/', 1);

insert into Bio_Fields
  (title)
values
  ('What is your preferred name?'),
  ('What have you been doing before HR?'),
  ('Where are you from?'),
  ('What are your interests?'),
  ('Any experience in the tech field?'),
  ('What are some fun facts about yourself?');
