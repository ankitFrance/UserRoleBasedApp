const router = require('express').Router();




const renderGoogleProfile = (req, res, next, user) => {
  req.session.ISGOOGLEUSER = true;
  const GoogleUser = req.user;
  res.render('profile', { GoogleUser });
  //next(); // Call next to pass control to the next middleware
 
};



const renderNormalprofile = (req, res, next) => {
  const userData = req.session.FetchEmailForLogin;
  console.log(req.sessionID);
  res.render('profile', { userData });
  
};




const isAuthGoogle = (req, res, next) => {
  if (req.user) {     // req.user coming from passportSetup.js
    
    renderGoogleProfile(req, res, next, req.user);
  } else {

   req.session.ISGOOGLEUSER = false; 
    next(); // Call next to pass control to the next middleware
    
  }

};



const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    if (req.session.isAuthWithAdmin) {
      res.redirect('/admin/AllUsers');
    } else {
      renderNormalprofile(req, res, next);
    }
  } else {
    res.redirect('/auth/Login');
  }
};



router.get('/Profile', isAuthGoogle, isAuth);
module.exports = router;