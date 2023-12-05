






const router = require('express').Router();
const session = require('express-session');
const LastLogin = require('../models/lastLogin')
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const {roles} =  require('../models/constants'); 
const passport = require ('passport');


router.get('/orcid', (req, res, next)=>{
  res.send('orcid ')
})



router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}))

router.get('/Login', (req, res, next)=>{
    res.render('login')   
});

router.get('/google/redirect',passport.authenticate('google'), (req, res, next)=>{
  res.redirect('/user/Profile') 
 
});



router.get('/Register', (req, res, next)=>{
  
    res.render('register'); 
    
});






router.post('/Login', (req, res, next)=>{
    
   
   const email_field = req.body.email_field   
   const password_field1 = req.body.password_field1  

   async function LoginData(){
    const FetchEmailForLogin = await User.findOne({email_field});
    //console.log(FetchEmailForLogin)
    
    try {
      
           if (FetchEmailForLogin) {
               const passwordMatch = await bcrypt.compare(password_field1, FetchEmailForLogin.password_field1);
              
               if (passwordMatch){
              //---------------------TO SAVE LAST LOGIN FROM SESSION TO NEW DATABASE LOGININFO--------------------------------------//
             
                const existingLastLogin = await LastLogin.findOne({ email: FetchEmailForLogin.email_field });

                if (existingLastLogin) {
                  // Update the existing record instead of creating a new one
                  existingLastLogin.lastLogin = new Date();
                  await existingLastLogin.save();
                } else {
                  // Create a new record only if it doesn't already exist
                  FetchEmailForLogin.lastLogin = new Date();
                 
                  const lastlogin = new LastLogin({
                   
                    lastLogin: FetchEmailForLogin.lastLogin,
                    email: FetchEmailForLogin.email_field,
                    role: FetchEmailForLogin.role,
                    _id: FetchEmailForLogin._id,
                   
                  

                  });
                  await lastlogin.save();
                }

                

                

                //---------------------END OF TO SAVE LAST LOGIN FROM SESSION TO NEW DATABASE LOGININFO--------------------------------------//
                req.session.isAuth = true;
                
                req.session.FetchEmailForLogin = {     //req.session is an object used to store session info part of express-session middleware
                  _id: FetchEmailForLogin._id,
                  email: FetchEmailForLogin.email_field,
                  role: FetchEmailForLogin.role,
                  lastLogin: FetchEmailForLogin.lastLogin
                  
                };
                //0000000000000000000000000000000000000000000000000000000000000000000

                if(FetchEmailForLogin.role === roles.admin){
                  req.session.isAuthWithAdmin = true;
                }

                //0000000000000000000000000000000000000000000000000000000000000000000
                return res.redirect('/user/Profile');
                
               }

               else {
               console.log('incorrect password ')
               req.flash('error', 'incorrect password');
               res.redirect('/auth/Login');
               }
           }

           else{
           console.log('email not found ')
           req.flash('error', 'Email not found');
           res.redirect('/auth/Login');
           }
        } 
    catch (error) 
        {
          console.error('Error :', error);
        }
    
   }
   LoginData()
   
});









router.post('/Register', (req, res, next)=>{
   
    //*******************************INSERTION OF FIELD VALUES OF REGISTER FORM TO DATABASE********************************* */

    const email_field = req.body.email_field    // these are names in register.ejs
    const password_field1 = req.body.password_field1  // these are names in register.ejs
    const password_field2 = req.body.password_field2  // these are names in register.ejs


    async function saveData() {
        try {

                if (!email_field) {
                req.flash('error', 'Email cannot be blank');
                return res.redirect('/auth/Register');
                }
               //***********************CHECK IF EMAIL ALREADY EXIST/*************************************** */

               const doesExist = await User.findOne({email_field});
               if(doesExist){
                
                req.flash('error', 'Email already exists');
                 res.redirect('/auth/Register');
                 console.log('email already exist')
                 //res.render('register', { ErrorEmailAlready: 'E-mail already exists.' });
                 return
               }
               //***********************END OF CHECK IF EMAIL ALREADY EXIST/******************************** */

               //********************SEE IF PASSWORD MATCHES OR NOT ******************************************/
              
               else if (password_field1 !== password_field2) {
                 
                 req.flash('error', 'Password and confirm password do not match');
                 res.redirect('/auth/Register');
                 console.log('password and confirm passwords do not match') 
                 return
               } 

              else if (!password_field1 || !password_field2) {
                req.flash('error', 'Password cannot be blank');
                return res.redirect('/auth/Register');
               }

               else if (password_field1.length < 8) {
                req.flash('error', 'Password must be at least 8 characters long');
                return res.redirect('/auth/Register');
                }

               else {
                 console.log('Password and Confirm Password matches.');
               // SO allowing user to register his credentials in database
               // Create an instance 'user' of the model 'User' that we imported in this file with the form data
               const user = new User({
                email_field,        // this is coming from user.model.js 
                password_field1,    // this is coming from user.model.js 
                roles
                
                   
                
                });
 
               // Save the instance to the database
                const savedData = await user.save();
                req.flash('success', 'You have been registered');
                //res.send(savedData)   // sending json mongodb to other page after register
                console.log('Data saved successfully:', savedData);
                
                res.redirect('/auth/Register');
               
               
                
                
               }
            }


        catch (error) 
           {
               console.error('Error saving data:', error);
           } 
      }
      // Calling
      saveData();
      //**************************** END OF INSERTION OF FIELD VALUES OF REGISTER FORM TO DATABASE******************************* */
});


router.get('/Logout', async(req, res, next)=>{

  req.logout((err) => {
    if (err) {
        return next(err);
    }
    // Perform any additional actions before redirecting or responding to the client
    res.redirect('/');
});
  
  /* 
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
  */  
});

module.exports = router;




// ********************************************************************
/*
The await keyword is used to wait for the asynchronous operation to complete. In this case, user.save() is likely a database operation that returns a promise. The await ensures that the function pauses and waits for this promise to resolve before proceeding.
Once the user.save() operation is complete, and the result is stored in savedData, it sends the saved data as a response. 
*/











