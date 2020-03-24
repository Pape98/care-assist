var express = require('express');
var router = express.Router();
var moment = require('moment');
const {  ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/landing/index');
});


/* GET login page */
router.get('/login',function(req,res,next){
  res.render('pages/landing/login');
});

/* GET home page */
router.get('/home',ensureAuthenticated,function(req,res,next){
  var date = moment().format('MMMM Do YYYY');
  res.render('pages/landing/home',{date:date});
});

module.exports = router;
