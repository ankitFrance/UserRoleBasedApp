const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},(accessToken, refreshToken, profile, done)=>{
      //passport call back function
      console.log('passport callback function fired')
      console.log(profile);
})

)





















//Callback Function: The callback function you provide in passport.use is executed when the authentication is successful.
// It's where you define how to handle the user's information received from Google. 
//This function typically includes logic to store user information in your database, create a user session,
// or perform any other actions needed for your application.



//Callback URL: In your application, you define a callback URL. 
//This is the URL to which Google will send the user after authentication.
 //It's the endpoint where your application receives the data about the authentication.