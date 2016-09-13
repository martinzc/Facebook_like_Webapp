// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        var webFetch = fetch(url)
            .then(r => r.json())
            .then(r => r["articles"]).then(function(r) {
                var map = {};
                r.forEach(function(elem) {
                    map[elem._id] = elem.text.split(' ').length;
                })
                return map;
            }); 
        return webFetch;
    }

    function countWordsSafe(url) {
        var webFetch = fetch(url)
            .then(r => r.json())
            .catch(function(e) {
              console.log(e);
            })
            .then(r => r["articles"]).then(function(r) {
                var map = {};
                r.forEach(function(elem) {
                    map[elem._id] = elem.text.split(' ').length;
                })
                return map;
            })
            .catch(function(e) {
                console.log(e);
                return {};
            })
        return webFetch;
    }

    function getLargest(url) {
        var webFetch = fetch(url)
            .then(r => r.json())
            .catch(function(e) {
              console.log(e);
            })
            .then(r => r["articles"]).then(function(r) {
                var map = {};
                r.forEach(function(elem) {
                    map[elem._id] = elem.text.split(' ').length;
                })
                var largestId = "none";
                var largestWordCount = -1;
                for (var key in map) {
                    if (map[key] >= largestWordCount) {
                        largestId = key;
                        largestWordCount = map[key];
                    }
                }
                return largestId;
            })
            .catch(function(e) {
                console.log(e);
                return {};
            })
        return webFetch;
    }

    exports.inclass = {
        author: "Chao Zhou",
        countWords, countWordsSafe, getLargest
    }

})(this);
