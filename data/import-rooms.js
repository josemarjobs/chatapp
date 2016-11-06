var rooms = require('./rooms')
var chatDB = require('./chatDB')
chatDB.connect
.then(db => db.collection('rooms').insertMany(rooms))
.then(result => {
  console.log(result);
  chatDB.close();
})
.catch(err => console.log(err));
