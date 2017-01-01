let Router = require('express').Router;
let jwt = require('jwt-simple');

const indexRouter = Router()


indexRouter.get('/', function (req, res) {
  console.log("?????")
  res.render('index');
});

// ---------


// Middleware Functions
function checkHeaders(req, res ,next){
	if(!req.headers.authorization) {
		return res.status(401).send('You are not authorized')
	}
	next()
}

function authenticateJwt(jwtLibrary){
   const jwtLib = jwtLibrary
   return function(req, res, next){
   	let token = req.headers.authorization.split(' ')[1];
   	let payload = jwtLib.decode(token, 'shhh...')
      if(!payload.sub)  {
   		return res.status(401).send('Authentication failed')
   	}
   	next()
  }
}

function queryDataAndRespond(req,res,next){
	let topSecret = [
		{title: "Baby Shampoo", desc: "Get the baby shampoo 4 u", currentlyActive: true},
		{title: "Rosemary", desc: "Add some spice to your live", currentlyActive: false},
		{title: "Undersell", desc: "Price low low low, buy high", currentlyActive: true}
	]
	return res.json(topSecret)

}

indexRouter.get(
	'/protected-data', 
	checkHeaders, 
	authenticateJwt(jwt), 
	queryDataAndRespond 
)

module.exports = indexRouter
