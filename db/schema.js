const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);

const UserSchema = require('./models/User.js');


module.exports = {
  User: createModel('User', UserSchema)
}
