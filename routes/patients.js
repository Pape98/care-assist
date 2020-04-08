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
    else {
      req.flash("success", "Patient has been successfully created!");
      res.redirect('/patients/' + newPatient._id)
    }
  })
});
/** DELETE indiviudal patient */
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  Patient.deleteOne({
    _id: id
  }, function (err, response) {
    if (err) return console.log(err);
    else {
      req.flash('success', 'Patient has successfully been deleted.')
      res.redirect('/patients')
    }
  });
});

/** GET patients listing. */
router.get('/', function (req, res, next) {
  Patient.find({}, function (err, patients) {
    if (err) console.log(err);
    else {
      res.render('pages/patient/index', {
        patients: patients
      });
    }
  });
});

/** SHOW individual patient */
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Patient.findById(id, function (err, patient) {
    if (err) console.log(err);
    else {
      res.render('pages/patient/show', {
        patient: patient
      });
    }
  });
});

/** UPDATE individual patient */
router.put('/:id', function (req, res, next) {
  var info = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday: req.body.birthday,
    gender: req.body.gender,
    physician: req.body.physician,
    home_address: req.body.home_address,
    weight: req.body.weight,
    height: req.body.height,
    emergency: req.body.emergency,
    blood_type: req.body.blood_type
  }

  var id = req.params.id;

  Patient.findOneAndUpdate({
    _id: id
  }, info, function (err, patient) {
    if (err) console.log(err);
    else {
      req.flash('success', 'Patient information has successfully been updated.')
      res.redirect('/patients/' + patient._id);
    }
  });
});

module.exports = router;