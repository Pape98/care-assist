const express = require('express');
const router = express.Router();
const {  ensureAuthenticated } = require('../config/auth');


/* GET Home page */
router.get('/', (req, res) => res.render('welcome'));

/* GET Dashboard page (using ensureAuthenticated) */
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));


/* GET home page */
// router.get('/home',function(req,res,next){
//   var date = moment().format('MMMM Do YYYY');
//   res.render('pages/landing/home',{date:date});
// });

module.exports = router;
