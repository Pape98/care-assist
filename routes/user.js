var express = require('express');
var router = express.Router();

/* GET user profile. */
router.get('/profile', function(req, res, next) {
  res.render('pages/user/index');
});


module.exports = router;
