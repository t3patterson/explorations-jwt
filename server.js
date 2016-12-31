global.PROJECT_NAME = 'jwt-explorations'

if (!global.PROJECT_NAME) { //« set by npm run init-dev »
	throw new Error('no project name set. did you forget to run "npm run init-dev"?')
}
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x


const bodyParser = require('body-parser');
const express = require('express');
const renderFile = require('ejs').renderFile

const connectToDB = require('./config/db-setup.js').connectToDB

const authRouter = require('./routes/authRouter.js')
const indexRouter = require('./routes/indexRouter.js')

const {cors} = require('./config/middleware.js')

var app = express()
const PORT = process.env.PORT || 3000

// =========
// VIEW ENGINE
// =========
app.set('views', './public');
app.engine('html', renderFile)
app.set('view engine', 'html');

// =========
// APPLICATION MIDDLEWARE
// =========
app.use( express.static( __dirname + '/public/assets') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}) );
app.use( cors )

// =========
// APPLICATION ROUTES
// =========
app.use( '/', indexRouter )
app.use( '/auth', authRouter )


app.listen(PORT,function() {
  console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})

connectToDB(global.PROJECT_NAME)
