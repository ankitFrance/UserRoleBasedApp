const router = require('express').Router();
const session = require('express-session');
const User = require('../models/user.model')
const bcrypt = require('bcrypt');



router.get('/Login', (req, res, next)=>{
    res.render('login')   // file name login.ejs  is written as login (render is for file)
});

router.get('/Register', (req, res, next)=>{
    res.render('register')  // file name register.ejs  is written as register (render is for file)
});

router.post('/Login', (req, res, next)=>{
    
   
   const email_field = req.body.email_field   
   const password_field1 = req.body.password_field1  

   async function LoginData(){
    const FetchEmailForLogin = await User.findOne({email_field});
    try {
      
           if (FetchEmailForLogin) {
               const passwordMatch = await bcrypt.compare(password_field1, FetchEmailForLogin.password_field1);
              
               if (passwordMatch){
                //console.log('login sucessful ')
                req.session.isAuth = true;
                
                res.redirect('/user/Profile');
               }
               else
               //console.log('incorrect password ')
               res.redirect('/auth/Login');
              
           }

           else{
           res.send('email not found ')
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
  //
    async function saveData() {
        try {
               //***********************CHECK IF EMAIL ALREADY EXIST/*************************************** */

               const doesExist = await User.findOne({email_field});
               if(doesExist){
                 res.redirect('/auth/Register');
                 console.log('record exist already')
                 return
               }
               //***********************END OF CHECK IF EMAIL ALREADY EXIST/******************************** */

               //********************SEE IF PASSWORD MATCHES OR NOT ******************************************/
              
               else if (password_field1 !== password_field2) {
                 res.redirect('/auth/Register');
                 console.log('Password and Confirm Password do not match.. Please try again');
                 return
               } 

               else {
                 console.log('Password and Confirm Password matches.');
               // SO allowing user to register his credentials in database
               // Create an instance 'user' of the model 'User' that we imported in this file with the form data
               const user = new User({
                email_field,        // this is coming from user.model.js 
                password_field1     // this is coming from user.model.js 
                });
 
               // Save the instance to the database
                const savedData = await user.save();
                res.send(savedData)
                console.log('Data saved successfully:', savedData);
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
    
    
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
    
});

module.exports = router;


// ********************************************************************
/*
The await keyword is used to wait for the asynchronous operation to complete. In this case, user.save() is likely a database operation that returns a promise. The await ensures that the function pauses and waits for this promise to resolve before proceeding.
Once the user.save() operation is complete, and the result is stored in savedData, it sends the saved data as a response. 
*/