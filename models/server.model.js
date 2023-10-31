// we made a session here

// session.js
const storeSession = require('./sessionTOdatabase.model');   // to store session details to the mongoose database 
const session = require('express-session');

// Configure session middleware
const sessionMiddleware = session({
  secret: 'iamkey',
  resave: false,
  saveUninitialized: true,
  name: 'ankit session',
  store: storeSession
});

module.exports = sessionMiddleware;
