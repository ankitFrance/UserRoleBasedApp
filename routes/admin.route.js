const router = require('express').Router()
const User = require('../models/user.model')
const LastLogin = require('../models/lastLogin')


const isAdmin = (req, res, next)=>{
    if (req.session.isAuthWithAdmin){
      next()
    }
    else {
      req.flash('error', 'Not Authorized');
      res.redirect('/');
      
    }
    }

router.get('/AllUsers',isAdmin,  async(req, res, next)=>{

 
    try {

      
        const Allusers = await User.find()
        const LoggedInUsers = await LastLogin.find()
       
        
        
        //res.send(Allusers)
        res.render('manageUsers', {Allusers, LoggedInUsers})
      
        
    } catch (error) {
        console.log(" users not found ")
        next()
    }
  
  });








  module.exports = router;