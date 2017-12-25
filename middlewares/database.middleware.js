const mongoose = require('mongoose');
var assert = require('assert');

const databaseMiddleware = function(url) {
  return function(req, res, next) {
    // Connection URL

    mongoose.connect(url, {
      useMongoClient: true
    }, function(err, database) {
      assert.equal(null, err);
      console.log('Connected successfully to server mongodb');
      next();
    });

  }
}



module.exports = databaseMiddleware;
