// var Sequelize = require('sequelize');
// var orm = new Sequelize('chat', 'root', '');	// database, username, password

// var User = orm.define('User', {
// 	username: Sequelize.STRING
// });

// var Message = orm.define('Message', {
// 	text: Sequelize.STRING,
// 	roomname: Sequelize.STRING
// });

// User.hasMany(Message);
// Message.belongsTo(User);

// User.sync();
// Message.sync();

// exports.User = User;
// exports.Message = Message;

var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat' // do we need require schema.sql??
});

connection.connect();

module.exports = connection;


