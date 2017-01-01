let Router = require('express').Router;
let {User} = require('../db/schema.js')
const jwt = require('jwt-simple');

const authRouter = Router()


// Middleware Functions
let createNewUser = function(UserModel, jwtLib){
  const UserMod = UserModel
  return function(req, res, next){
	 let newRecord = new UserMod(req.body)
    newRecord.save(function(err, record){
       if(err) return res.status(500).send('big time error')
  	  
       let payload = {
  	    	iss: req.hostname, //issuer of payload
         sub: newRecord.id
  	  	}

  	  let token = jwtLib.encode(payload, 'shhh...')
       return res.json({
  			user: record.toJSON(),
  			token: token
  		  })
    }) 
  }
      
}

let checkIfUserExists = function(UserModel){
	const UserMod = UserModel
	return function(req, res, next){
		UserMod.findOne({email: req.body.email})
		   .exec()
		   .then((foundUser)=>{
			   if(!foundUser) next() 
					else return res.status(401).send('user already exists')
					
		   })

	}
} 

authRouter
 .post('/register', checkIfUserExists(User), createNewUser(User, jwt) )


module.exports = authRouter
