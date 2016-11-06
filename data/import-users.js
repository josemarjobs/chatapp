var users = require('./users.json')
var User = require('./chatDB').User;
var chatDB = require('./chatDB');
function importUsers() {
  User.insertMany(users)
  .then((result) => {
    console.log("Inserted:", result)
    chatDB.close();
  }).catch(err => console.log(err));
}
importUsers()
