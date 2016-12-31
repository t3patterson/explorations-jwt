const mongoose = require('mongoose')
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email:        { type: String, required: true },
  password:     { type: String, required: true }
})

UserSchema.pre('save', function(next){
	if(!this.isModified('password')) return next()
	
	bcrypt.hash(this.password, 10, (err, hash)=>{
		if(err) return next(err)
		this.password = hash
		next()
	})
	
})

UserSchema.methods.toJSON = function(){
	let user = this.toObject()
	delete user.password
	return user
}

module.exports = UserSchema