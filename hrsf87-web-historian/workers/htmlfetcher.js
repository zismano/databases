// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers');

var notArchived = []; // store files not archived yet

// function is declared and invoked immediately
exports.findArchived = function() {
	archive.readListOfUrls((urls) => {  // get list of urls from site.txt
  		for (let i = 0; i < urls.length; i++) { // for each url
  //			var url = urls[i];
    		archive.isUrlInDB(null, urls[i], (boolean) => { 
      		if (!boolean) { // if url isn't archived
        		notArchived.push(urls[i]);  // store url
	//			console.log(url);
    //    	  	archive.downloadUrls(url);  // download htmls of non-archived urls
      		}
    	});
  	}
  	console.log(notArchived);
  	archive.downloadUrls(notArchived);  // download htmls of non-archived urls
	});
}
