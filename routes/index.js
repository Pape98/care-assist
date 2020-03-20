var express = require('express');
var router = express.Router();

/* GET Home page. */
router.get('/', (req, res) => res.render('welcome'));

/* GET Dashboard page. */
router.get('/dashboard', (req, res) => res.render('dashboard'));


/* GET home page */
// router.get('/home',function(req,res,next){
//   var date = moment().format('MMMM Do YYYY');
//   res.render('pages/landing/home',{date:date});
// });

module.exports = router;
