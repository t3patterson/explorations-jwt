# Setup JWT

### (1) `UserModel.js` -- server
+ include mongoose + bcrypt
+ write a pre-save hook method that will salt+hash the password
+ overwrite the toJSON() method that will delete the pw for the response

```
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
```

### (2)`services/jwt.js` -- -- server
+ creates `«header-base64».«payload-base64».«signature-base64»` jwt
+ 

```
const crypto = require('crypto')

function _base64Encode(str){
	return Buffer.from(str, 'utf8').toString('base64')
}

function _sign(jwtContents, key){
	return crypto.createHmac('sha256', key).update(jwtContents).digest('base64')
}

function encodeJwt(payload, secret){
	let header = {
		typ : 'JWT',
		alg: 'HS256',
	}

	//header.payload.signature
	let jwtHeader =  _base64Encode(JSON.stringify(header))
	let jwtPayload = _base64Encode(JSON.stringify(payload))
	let jwtSignature = _sign(`${jwtHeader}.${jwtPayload}`, secret)
   let jwt = `${jwtHeader}.${jwtPayload}.${jwtSignature}`
	return jwt
}

module.exports = { encodeJwt  }
```


### (3)`authRouter.js` -- `/auth/register` route for register-- server
```
let Router = require('express').Router;
let {User} = require('../db/schema.js')
const { encodeJwt } = require('../services/jwt.js')

const authRouter = Router()

authRouter
 .post('/register', function(req, res){
   
     User.findOne({email: req.body.email})
        .exec()
        .then((foundUser)=>{
           console.log(foundUser)
           if(!foundUser) createNewUser(req, res, User)
              else res.status(401).send('user already exists')
        })
     
 })

let createNewUser = function(req, res, UserMod){
  
  let newRecord = new UserMod(req.body)
  newRecord.save(function(err, record){
     if(err) return res.status(500).send('big time error')
	  
     let payload = {
	    iss: req.hostname, //issuer of payload
       sub: record._id
	  }

	  let token = encodeJwt(payload, 'shhh...')

     res.json({
		user: record.toJSON(),
		token: token
	  })
  })     
}

```

### (4)`services/authtoken.js` -- client
+ manages setting and retrieving the token from local storage
```
const appName = `${window.location.hostname}_APP_TOKEN`
let cachedToken

function getToken(){
	if(!cachedToken){
		cachedToken = window.localStorage.getItem(appName)
	}
	return cachedToken
}

function setToken(token){
	cachedToken = token
	window.localStorage.setItem(appName, token)
}

function removeToken(){
	cachedToken = null
	window.localStorage.removeItem(appName)
}

function isAuthenticated(){
	return !!getToken()
}



module.exports = {
	getToken,
	setToken,
	isAuthenticated,
	removeToken	
}
```

### ``
