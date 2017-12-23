var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


var connection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'chat' // do we need require schema.sql??
});

// connection.connect();
// // write a query to return username, roomname, message
// var queryString = 'SELECT u.username, m.message, r.roomname FROM messages m, rooms r, users u where r.id = m.roomname AND u.id = m.username';

// connection.query(queryString, (error, result, fields) => {
//   if (error) {
//     throw error;
//   }
//   console.log(`Result is: ${result}`);
//   console.log('Fields are: ${fields}');
// });
// connection.end(result);

