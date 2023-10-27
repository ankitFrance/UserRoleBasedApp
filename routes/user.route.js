const router = require('express').Router();

router.get('/Profile', async(req, res, next)=>{
    res.render('profile')
});

module.exports = router;