var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
    	// fetch all messages
    	var queryString = 'select messages.id, messages.text, messages.roomname, users.username \
                      from messages left outer join users on (messages.userid = users.id) \
                      order by messages.id desc';
    	db.query(queryString, function(err, results) {
    		callback(results);
    	});
    }, // a function which produces all the messages
    post: function (params, callback) {
    	// create a message
    	var queryString = 'insert into messages(text, userid, roomname) \
                      value (?, (select id from users where username = ? limit 1), ?)';
    	db.query(queryString, params, function(err, results) {
    		callback(results);
    	});
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
    	// fetch all users
    	var queryString = 'select * from users';
    	db.query(queryString, function(err, results) {
    		callback(results)
    	})
    },
    post: function (params, callback) {
    	// create a user
    	var queryString = 'insert into users(username) values (?)';
    	db.query(queryString, params, function(err, results) {
    		callback(results);
    	});
    }
  }
};

