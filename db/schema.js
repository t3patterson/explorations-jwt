const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const exampleSchema = new Schema({
  // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})



module.exports = {
  Example: createModel('Example', usersSchema)
}
