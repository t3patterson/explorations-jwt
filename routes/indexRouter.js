let Router = require('express').Router;
let {decodeJwt} = require('../services/jwt.js')

const indexRouter = Router()


indexRouter.get('/', function (req, res) {
  res.render('index');
});

//get and render the register page
indexRouter.get('/register', function (req, res) {
  res.render('views/register');
});

indexRouter.get('/login', function (req, res) {
  res.render('views/login');
});

indexRouter.get('/dashboard', function (req, res) {
  res.render('views/dashboard');
});

indexRouter.get('/forbidden', function (req, res) {
  res.render('views/forbidden');
});

// ---------

let topSecret = [
	{title: "Baby Shampoo", desc: "Get the baby shampoo 4 u", currentlyActive: true},
	{title: "Rosemary", desc: "Add some spice to your live", currentlyActive: false},
	{title: "Undersell", desc: "Price low low low, buy high", currentlyActive: true}
]

indexRouter.get('/protected-data', function (req, res) {
	if(!req.headers.authorization) return res.status(401).send('You are not authorized')
   let token = req.headers.authorization.split(' ')[1];
	let payload = decodeJwt(token)
   if(!payload.sub)  return res.status(401).send('Authentication failed ')
	
	return res.json(topSecret)
});



module.exports = indexRouter
