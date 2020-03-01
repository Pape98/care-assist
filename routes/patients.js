var express = require('express');
var router = express.Router();

/* GET patients listing. */
router.get('/', function(req, res, next) {
  res.render('pages/patient/index');
});

module.exports = router;
