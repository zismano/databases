var models = require('../models');
var bluebird = require('bluebird');
var db = require('../db');

var userFields = ['username'];
var messageFields = ['message', 'username', 'roomname'];

module.exports = {
  messages: {
    get: function (req, res) {
    	db.Message.findAll( { include: [db.User] } )	// when we user include, we perform left outer join by default
    		.complete(function(err, results) { // invoked when query is done
    		// TODO: handler err
    		res.json(results);	// related to express, sends a JSON response
    	});
    },
    post: function (req, res) {
    	db.User.findOrCreate( {username: req.body[username] })
    		.complete(function(err, user) {
    	var params = {
    		message: req.body[message],
    		userid: user.id,
    		roomname: req.body[roomname]
    	};
    	db.Message.create(params)
    		.complete(function(err, results) {
    			res.sendsStatus(201);
    		}); 	
    });	// creating a user unnecessary exists
   } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
     	db.User.findAll()
    		.complete(function(err, results) { // invoked when query is done
    		// TODO: handler err
    		res.json(results);	// related to express, sends a JSON response
    	});
    },
    post: function (req, res) {
    	db.User.create( {username: req.body[username] })
    		.complete(function(err, user) {
    			res.sendStatus(201);
    		});
    }
  }
};

// without sequelize and orm
// var models = require('../models');
// //var bluebird = require('bluebird');

// var userFields = ['username'];
// var messageFields = ['message', 'username', 'roomname'];

// module.exports = {
//   messages: {
//     get: function (req, res) {
//     	models.messages.get(function(err, results) {
//     		// TODO: handler err
//     		res.json(results);	// related to express, sends a JSON response
//     	});
//     }, // a function which handles a get request for all messages
//     post: function (req, res) {
//     	var params = [req.body[message], req.body[username, req.body[roomname]];
//     	models.messages.post(params, function(err, results) {
//     		// TODO: handler err
//     		res.json(results);	// related to express, sends a JSON respons
//     	});
//     } // a function which handles posting a message to the database
//   },

//   users: {
//     // Ditto as above
//     get: function (req, res) {
//     	models.users.get(function(err, results) {
//     		res.json(results);	// related to express, sends a JSON response
//     	})	
//     },
//     post: function (req, res) {
//     	var params = [req.body[username]];
//     	models.users.post(params, function(err, results) {
//     		res.json(results);	// related to express, sends a JSON response
//     	});
//     }
//   }
// };








