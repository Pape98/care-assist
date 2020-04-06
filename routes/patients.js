var express = require('express');
var router = express.Router();
var Patient = require('../models/Patient');

/** GET new patient form */

router.get('/new', function (req, res, next) {
  res.render('pages/patient/new')
});

/** POST new patient form */
router.post('/', function (req, res, next) {

  var {
    first_name,
    last_name,
    birthday,
    gender,
    physician,
    home_address,
    weight,
    height,
    emergency,
    blood_type,
  } = req.body

  var newPatient = new Patient({
    first_name,
    last_name,
    birthday,
    gender,
    physician,
    home_address,
    weight,
    height,
    blood_type,
    emergency
  });

  newPatient.save(function (err, newPatient) {
    if (err) return console.log(err);
    else res.json(newPatient)
  })
});

/* GET patients listing. */
router.get('/', function (req, res, next) {
  Patient.find({},function(err,patients){
    res.render('pages/patient/index',{patients:patients});
  });
});

/* SHOW individual patient */
router.get('/:id', function (req, res, next) {
  id = req.params.id;
  Patient.findById(id,function(err,patient){
    res.render('pages/patient/show',{patient:patient});
  });
});



module.exports = router;