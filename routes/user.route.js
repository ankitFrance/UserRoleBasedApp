const router = require('express').Router();

const isAuth = (req, res, next)=>{
  if (req.session.isAuth){
    next()
  }
  else {
    res.redirect('/auth/Login');
  }
  }

router.get('/Profile', isAuth , (req, res, next)=>{
  console.log(req.sessionID)
    res.render('profile')
});

module.exports = router;