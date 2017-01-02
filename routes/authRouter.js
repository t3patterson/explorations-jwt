let Router = require('express').Router;
let {User} = require('../db/schema.js')
const jwt = require('jwt-simple');

const authRouter = Router()


// Middleware Functions
let generateToken = function(jwtLib){
	return function(req, res, next){
		let userRecord = req.userModel
		let payload = {
		  iss: req.hostname, //issuer of payload
		  sub: userRecord.id
		}

		let token = jwtLib.encode(payload, 'shhh...')
		return res.json({
		  user: userRecord.toJSON(),
		  token: token
		 })
	}
}

let createNewUser = function(UserModel, jwtLib){
  const UserMod = UserModel
  return function(req, res, next){
	 // returns 401 if user record was found
	 if (req.userModel) return res.status(401).send('user already exists')
		 
	 let newRecord = new UserMod(req.body)
    newRecord.save(function(err, record){
       if(err) return res.status(500).send('big time error')
  	  	 req.userRecord = newRecord
		 next()
    }) 
  }
      
}

let findUserRecord = function(UserModel){
	const UserMod = UserModel
	return function(req, res, next){
		UserMod.findOne({email: req.body.email})
		   .exec()
		   .then((foundUser)=>{
				console.log(foundUser)
				req.userModel = foundUser
				next()
			})
	}
} 

let authenticateUser = function(req, res, next){
	if(!req.userModel) return 	res.status(401).send('user no exist')

	req.userModel.comparePasswords(req.body.password, function(err, isMatch){
		console.log('password a match??')
		
		if(isMatch) next()
			else return res.status(403).send('Password not correct ')
	})
}

authRouter
   .post(
		'/register', 
		findUserRecord(User), 
		createNewUser(User),
		generateToken(jwt)
	)



authRouter
	.post(
		'/login', 
		findUserRecord(User), 
		authenticateUser,
		generateToken(jwt)
	)

module.exports = authRouter
