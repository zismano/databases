-- CREATE DATABASE chat;

-- USE chat;

-- /* Create other tables and define schemas for them here! */
-- -- CREATE TABLE rooms (
-- --   id int NOT NULL AUTO_INCREMENT,
-- --   roomname varchar(25),
-- --   PRIMARY KEY (ID)
-- -- );

-- CREATE TABLE users (
--   id int NOT NULL AUTO_INCREMENT,
--   username varchar(25),
--   PRIMARY KEY (ID)
-- );

-- CREATE TABLE messages (
--   /* Describe your table here.*/
--   id int NOT NULL AUTO_INCREMENT,
--   -- username integer,
--   userid int NOT NULL,
--   -- message varchar(200),
--   text varchar(200) NOT NULL,
--   -- roomname integer,
--   roomname varchar(20),
--   PRIMARY KEY (ID),
--   -- FOREIGN KEY (username) REFERENCES users(id) ON DELETE SET NULL,
--   -- FOREIGN KEY (roomname) REFERENCES rooms(id) ON DELETE SET NULL  
-- );

-- -- INSERT INTO rooms (id, roomname) VALUES (1, 'lobby');
-- -- INSERT INTO users (id, username) VALUES (1, 'Ofir');
-- -- INSERT INTO messages (id, message, username, roomname) VALUES (1, 'Hello', 1, 1);

-- /*  Execute this file from the command line by typing:
--  *    mysql -u root < server/schema.sql
--  *  to create the database and the tables.*/
 
 CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/

  id int NOT NULL AUTO_INCREMENT,
  userid int NOT NULL,
  text varchar(200)  NOT NULL,
  roomname varchar(20),
  PRIMARY KEY (ID)
);

/* Create other tables and define schemas for them here! */


CREATE TABLE users (
  id        int    NOT NULL AUTO_INCREMENT,
  username  varchar(40)   NOT NULL,
  PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

