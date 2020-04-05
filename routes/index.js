var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('pages/landing/index');
});


/* GET login page */
router.get('/login',function(req,res,next){
  res.render('pages/landing/login');
});

// /* GET login page */
// router.get('/loader',function(req,res,next){
//   res.render('pages/landing/loader');
// });


module.exports = router;
