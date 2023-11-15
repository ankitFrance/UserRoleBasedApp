const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('./user.model')

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},(accessToken, refreshToken, profile, done)=>{

    User.findOne({googleID: profile.id}).then((currentUser)=>{
        if(currentUser){
            console.log('user already exist')
        }
        else {
                 //passport call back function
            console.log('passport callback function fired')
            console.log(profile);
            new User({
            googleID: profile.id,
            googleUsername : profile.displayName
           }).save().then((newUser)=>{
            console.log('new user created', newUser)
           })
        }
    })
      
})

)





















//Callback Function: The callback function you provide in passport.use is executed when the authentication is successful.
// It's where you define how to handle the user's information received from Google. 
//This function typically includes logic to store user information in your database, create a user session,
// or perform any other actions needed for your application.



//Callback URL: In your application, you define a callback URL. 
//This is the URL to which Google will send the user after authentication.
 //It's the endpoint where your application receives the data about the authentication.