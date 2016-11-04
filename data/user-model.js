var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schema = new Schema({
  alias: {type: String, required: true, minLength: 6},
  roles: [String],
  contact: {
    phone: String,
    email: String
  },
  address: {
    lines: [String],
    city: String,
    state: String,
    zip: Number,
  }
})


module.exports = mongoose.model('User', schema);
