var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');


var url = "mongodb://localhost:27017/chat"
var connect = MongoClient.connect(url);

mongoose.Promise = global.Promise;
mongoose.connect(url);


// var Logger = require('mongodb').Logger;
// Logger.setLevel("debug");
mongoose.set('debug', true);

var User = require('./user-model');

module.exports = {
  connect,
  User,
  close: function(callback) {
    console.log("Closing mongoose");
    mongoose.disconnect();
    connect.then(db =>{
      console.log("Closing mongodb");
      db.close();
      callback()
    })
  }
}
