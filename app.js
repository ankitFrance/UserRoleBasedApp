const express = require('express')
const createHttpError = require('http-errors')
const morgan  = require('morgan')
const mongoose  = require('mongoose')
require ('dotenv').config()
const bodyParser = require('body-parser')


//******************Initialization*************************
const app = express()
app.use(morgan('dev')); // to show us the logs 
app.set('view engine', 'ejs');  // for view folder
app.use(express.static('public')); //to load the public folder 

//*********************************************************

//********************Body parser*************************

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded

app.use(bodyParser.json())  // parse application/json

//*********************************************************


//************************Routing**************************

app.use('/', require('./routes/index.route'))
app.use('/auth', require('./routes/auth.route'))
app.use('/user', require('./routes/user.route'))

//*********************************************************

// Handling errors 
app.use((req, res, next)=>{
    next(createHttpError.NotFound())
});

app.use((error, req, res, next)=>{
    error.status = error.status || 500
    res.status(error.status);  // sending 404
   // res.render('error404')   //file can be included
    res.send(error)
})
// Handling errors end

const port = process.env.PORT || 3080;

//************************************database connection********************************

mongoose.connect("mongodb://127.0.0.1:27017/GestDeUtil", {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', ()=>{
    console.log('something went wrong')
})

db.once( 'open', ()=>{
    console.log('connected sucessfully')
});


app.listen(port , () => {
    console.log('app is running on ${port}')
});




//************************************database connection********************************




/*

.on for 'error' event: Errors might occur at any time during the application's lifecycle, and you want to be informed whenever an error occurs. So, you use .on to continuously listen for 'error' events.

.once for 'open' event: The 'open' event is usually emitted once when the database connection is successfully established. After the connection is open, you don't need to listen for this event again. Using .once ensures that the success message is logged only once, avoiding unnecessary duplication

The .on and .once methods are commonly used with event emitters in Node.js. They are part of the EventEmitter class in Node.js

*/
