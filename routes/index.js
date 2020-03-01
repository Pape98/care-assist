var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/main/index');
});

/* GET login page */
router.get('/login',function(req,res,next){
  res.render('pages/main/login');
});

/* GET home page */
router.get('/home',function(req,res,next){
  res.render('pages/main/home');
});

module.exports = router;
