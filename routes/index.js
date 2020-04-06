var express = require('express');
var router = express.Router();
var Patient = require('../models/Patient');
var url = require('url');

/* GET landing page. */
router.get('/', function (req, res, next) {
  res.render('pages/landing/index');
});


/* GET login page */
router.get('/login', function (req, res, next) {
  res.render('pages/landing/login');
});

/* GET loader page */
router.get('/:state/loader', function (req, res, next) {
  var state = '';
  if (req.params.state == 'login') {
    state = "Setting things up for you!";
  } else if (req.params.state == 'logout') {
    state = "Logging you out!"
  }

  res.render('pages/landing/loader', {
    state: state
  });
});
/** API route to search specific patients */
router.get('/search', function (req, res, next) {
  const queryObject = url.parse(req.url, true).query;
  var name = queryObject['q'];
  console.log(queryObject)
  Patient.find({first_name:name}, 'first_name last_name', function (err, patients) {
    var editedPatients = []
    patients.forEach(function(patient){
      editedPatients.push({
        title : patient.first_name,
        description: patient.last_name,
        url: "/patients/"+patient._id 
      });
    });
    var data = {
      results: editedPatients
    }
    res.json(data);
  });
});

module.exports = router;