let Router = require('express').Router;
let {User} = require('../db/schema.js')
const { encodeJwt } = require('../services/jwt.js')

const authRouter = Router()

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


module.exports = authRouter
