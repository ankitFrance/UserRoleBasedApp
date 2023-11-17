

const router = require('express').Router();


const isAuth = (req, res, next)=>{
  if (req.session.isAuth){
     if (req.session.isAuthWithAdmin) {
      // Both conditions are true, redirect to the manageUsers page
      res.redirect('/admin/AllUsers');
    } else {
      // Only isAuth is true, redirect to the profile page
      next();
    }
    } else {
    res.redirect('/auth/Login');
    }
}

router.get('/Profile', isAuth ,  (req, res, next)=>{
      const userData = req.session.FetchEmailForLogin;
      console.log(req.sessionID)
      res.render('profile', {userData})
  });


const isAuthGoogle =  (req, res, next)=>{
    if (!req.user){
      res.redirect('/auth/Login');
    } 
    else{
      
      next()
    }
}


router.get('/ProfileG', isAuthGoogle,  (req, res, next)=>{
    //res.send('hi'+ req.user.googleID)
    const GoogleUser = req.user;
   res.render('googleProfile', {GoogleUser})
});

module.exports = router;