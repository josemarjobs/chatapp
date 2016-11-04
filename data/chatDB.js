var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;


var url = "mongodb://localhost:27017/chat"
var connect = MongoClient.connect(url);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(url);

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
