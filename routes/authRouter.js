let Router = require('express').Router;
let {User} = require('../db/schema.js')
const authRouter = Router()

let createNewUser = function(res, UserMod, reqBody){
  
  let newRecord = new UserMod(reqBody)
  newRecord.save(function(err, record){
     if(err) return res.status(500).send('big time error')
     res.json(record.toJSON())
  })     
}

authRouter
 .post('/register', function(req, res){
   
     User.findOne({email: req.body.email})
        .exec()
        .then((foundUser)=>{
           console.log(foundUser)
           if(!foundUser) createNewUser(res, User, req.body)
              else res.status(401).send('user already exists')
        })
     
 })


module.exports = authRouter
