const router = require('express').Router()
const User = require('../models/user.model')


const isAdmin = (req, res, next)=>{
    if (req.session.isAuthWithAdmin){
      next()
    }
    else {
      res.redirect('/');
    }
    }

router.get('/AllUsers',isAdmin,  async(req, res, next)=>{
    try {
        const Allusers = await User.find()
        //res.send(Allusers)
        res.render('manageUsers', {Allusers})
      
        
    } catch (error) {
        console.log(" users not found ")
        next()
    }
  });

  module.exports = router;