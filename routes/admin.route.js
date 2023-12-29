const router = require('express').Router()
const User = require('../models/user.model')
const LastLogin = require('../models/lastLogin')
const mongoose = require('mongoose')
const { roles } = require('../models/constants')


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



// this route  is for when user click ' view profile' 
  router.get('/AllUsers/:id',isAdmin,  async(req, res, next)=>{

    try {

        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
          req.flash('error', 'Not a valid id');
          res.redirect('/admin/Allusers')
          return
        }

        const Person = await User.findById(id)
        res.render('userProfByAdmin', {Person})

    } catch (error) {
        console.log(" error occ ")
        next()
    }
  
  });





  router.post('/AllUsers/updateRole',isAdmin,  async(req, res, next)=>{

    const {id, role}= req.body

    if(!id ||  !role) {
      req.flash ('error', 'invalid request....')
      return res.redirect('back')
    }

    //check for valid mongoose id 
    if(!mongoose.Types.ObjectId.isValid(id)) {
      req.flash ('error', 'invalid id...')
      return res.redirect('back')
    }

    //check for valid role
    const rolesArray = Object.values(roles) 
    if (!rolesArray.includes(role)){
      req.flash ('error', 'invalid role...')
      return res.redirect('back')
    }
    // admin cannot change himself 
    const user = await User.findById(id);
    if (user.role === roles.admin && role !== roles.admin) {
      req.flash('error', 'Admin cannot change their own role.');
      return res.redirect('back');
    }

    //update the user 
    const updateRole= await User.findByIdAndUpdate(id, {role}, {new: true, runValidators:true})
    req.flash ('success', 'role is updated')

    res.redirect('back')
  
  });






  module.exports = router;