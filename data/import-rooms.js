var MongoClient = require('mongodb').MongoClient;
var rooms = require('./rooms')

var url = "mongodb://localhost:27017/chat"
MongoClient.connect(url, (err, db) => {
  // db.collection('rooms').insertMany(rooms, (err, result) => {
  //   console.log(err, result);
  //   db.close();
  // });

  db.collection('rooms').find({}).toArray((err, rooms) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(rooms);

    db.close();
  })
});
