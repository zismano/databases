CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
  id integer primary key,
  roomname varchar(25)
);

CREATE TABLE users (
  id integer primary key,
  username varchar(25)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id integer primary key,
  message varchar(200),
  username integer,
  roomname integer,
  FOREIGN KEY (username) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (roomname) REFERENCES rooms(id) ON DELETE SET NULL  
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
 

