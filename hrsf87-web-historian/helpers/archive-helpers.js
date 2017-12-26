var mongoClient = require('mongodb').MongoClient;

// 27017 is the default port for connecting to MongoDB
// test is the name of our database
exports.url = 'mongodb://localhost:27017/';
exports.dbName = 'archivedDB';

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, data) => {  // read sites.txt file
    if (err) {
      throw err;
    } else {
      var links = data.toString().split('\n');  // split data by lines and store in links array
      callback(links);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(links) {  // get links stored in sites.txt
    callback(links.includes(url));  // callback on if url is found in links boolean
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', (err) => {  // add url to sites.txt
    callback(err);
  });
};

       // var document = {
       //    url: 'jono.com',
       //    pageSource: '<html><head><title>Jono\'s Awesome Blank Page</title></head><body></body></html>'
       //  };



exports.downloadUrls = function(urls) {
  for (let i = 0; i < urls.length; i++) { // use let in order to declare block scope local (in particular because we use inside the loop async functions)
    if (urls[i] !== '') {
      request('http://' + urls[i], function (error, response, body) { // receives html body of a url. simplest way to make http calls. It supports HTTPS and follows redirects by default.
        if (error) {
          console.log('error:', error); // Print the error if one occurred
        } else {
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          // console.log('body:', body); // Print the HTML for the Google homepage.
          console.log('url is: ' + urls[i]);
          let document = {
            url: urls[i],
            pageSource: body
          }
          exports.addUrlToDB(exports.url, document);
          console.log('The file has been saved!');
        }
      });     
    }
  }
};
//  }
//};

exports.addUrlToDB = function(url, document) {
  mongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) {
      console.log(err);    
    } else {
      console.log('Connected to MongoDB!');
      console.log(`DB is: ${db}`);
      var dbase = db.db('archivedDB');

      dbase.createCollection('archCol', function(err, collection) {
        console.log('Created collection archCol');

        collection.insertOne(document);
        db.close();
        console.log('Closed the connection!');
      });      
    }
  });
}

exports.isUrlInDB = function(url ,urlToFind, callback) {
  // Open the client's connection to the server:
  mongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) {
      console.log(err);
    } else {
    console.log('Connected to MongoDB!');  
    console.log(`DB is: ${db}`);
  
    var dbase = db.db('archivedDB'); //here

    // Create a collection, if it doesn't exist already:
    dbase.createCollection('archCol', function(err, collection) {
      console.log('Created collection archived');

      collection.find().toArray(function(err, urls) {
        if (err) {
          console.log(err);
        } else {
          var found = false;
          for (let i = 0 ; i < urls.length; i++) {
            if (urls[i].url === urlToFind) {
              found = true;
              break;

            }
          }
          callback(found);
        db.close();
        console.log('Closed the connection!');
      }
      });       
    });
  }
  });
}

exports.getHtmlBodyFromDB = function(requestedUrl, callback) {
  mongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    console.log(err);
    console.log('Connected to MongoDB!');
    console.log(`DB is: ${db}`);
  
    var dbase = db.db('archivedDB'); //here

    // Create a collection, if it doesn't exist already:
    dbase.createCollection('archCol', function(err, collection) {
      console.log('Created collection archCol');

      collection.find().toArray(function(err, urls) {
        if (err) {
          console.log(err);
        } else {
          for (var i = 0; i < urls.length; i++) {
            if (requestedUrl === urls[i].url) {
              var body = urls[i].pageSource;

              db.close();
              console.log('Closed the connection!');
              callback(body);
              break;
            }
          }
        }        
      }); 
    });
  });
};




