/** Make sure to create (or re-create) the database
 *  before running this code. To do this, run:
 *
 *  $ mysql -u root -p < server/schema.sql
 *
 *  Note: Change password if necessary.
 *  Also at the bottom are dummy variables to
 *  populate the table.
**/

drop database if exists alumConnect;
create database alumConnect;

use alumConnectTest;

create table Groups (
  id int not null auto_increment,
  group_name varchar(255),
  primary key(id)
);

create table Users (
  id int not null auto_increment,
  handle varchar(255),
  githubid int,
  name varchar(255),
  email varchar(255),
  image varchar(255),
  url_hash varchar(255),
  public int,
  permission int,
  primary key(id)
);

create table Groups_Users ( -- NEW MANY-MANY TABLE
  id int not null auto_increment,
  Group_id int not null,
  User_id int not null,
  primary key(id),
  foreign key(Group_id) references Groups(id) ON DELETE CASCADE,
  foreign key(User_id) references Users(id) ON DELETE CASCADE
);

create table Visible_Groups (
  id int not null auto_increment,
  Group_id int not null,
  Visible_id int not null,
  primary key(id),
  foreign key(Group_id) references Groups(id) ON DELETE CASCADE,
  foreign key(Visible_id) references Groups(id) ON DELETE CASCADE
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
  foreign key(User_id) references Users(id) ON DELETE CASCADE,
  foreign key(Site_id) references Sites(id) ON DELETE CASCADE

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
  foreign key(User_id) references Users(id) ON DELETE CASCADE,
  foreign key(Bio_Field_id) references Bio_Fields(id) ON DELETE CASCADE
);


insert into Groups
  (group_name)
values
  ('staff');

insert into Users
  (handle, githubid, name, email, image, url_hash, public, permission)
values

  -- ('your_handle', 'your_id', 'DONALD TRUMP', 'admin@admin.com', '/assets/photos/trump.jpg', 'ndas2q', 0, 1);
  ('mbresnan1701', 15022604, 'DONALD TRUMP', 'admin@admin.com', '/assets/photos/trump.jpg', 'ndas2q', 1, 1);

insert into Groups_Users -- new addition
  (user_id, group_id)
values
  (1, 1);

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
