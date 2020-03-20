var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.render('welcome'));
// router.get('/', function(req, res, next) {
//   res.render('index' ,{ title: 'Express' });
// });


// /* GET login page */
// router.get('/login',function(req,res,next){
//   res.render('login');
// });

// /* GET signup page */
// router.get('/signup',function(req,res,next){
//   res.render('signup');
// });

/* GET home page */
// router.get('/home',function(req,res,next){
//   var date = moment().format('MMMM Do YYYY');
//   res.render('pages/landing/home',{date:date});
// });

module.exports = router;
