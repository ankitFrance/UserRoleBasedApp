const router = require('express').Router();

router.get('/', (req, res, next)=>{
    res.render('index');
    console.log(req.sessionID) 
    
});

module.exports = router;