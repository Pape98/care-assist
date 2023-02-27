const express = require('express');
const router = express.Router();
const url = require('url');
const Patient = require('../models/Patient');
const Location = require('../models/Location');
const Data = require('../models/Data');
const PatientSeed = require('../seeds/patients');
const { ensureAuthenticated } = require('../config/auth');

/** Update patient location every 5 minutes */
function updateLocations() {
  Patient.find({}, function (err, patients) {
    patients.forEach(function (patient) {
      Location.findOne(
        {
          UID: patient.UID,
        },
        function (err, location) {
          if (location != null) {
            patient.latitude = location.latitude;
            patient.longitude = location.longitude;
            patient.save();
            console.log('Upated location for UID ' + patient.UID);
          }
        }
      );
    });
  });
}

setInterval(updateLocations, 2000);

function updateHealthData() {
  Patient.find({}, function (err, patients) {
    patients.forEach(function (patient) {
      Data.find(
        {
          UID: patient.UID,
        },
        null,
        { sort: { time: 1 } },
        function (err, data) {
          dataheartRate = [];
          dataaccelerometerX = [];
          dataaccelerometerY = [];
          dataaccelerometerZ = [];
          data.forEach(function (d) {
            dataheartRate.push(parseInt(d.heartrate));
            dataaccelerometerX.push(d.accelerometerX);
            dataaccelerometerY.push(d.accelerometerY);
            dataaccelerometerZ.push(d.accelerometerZ);
          });
          dataheartRate = dataheartRate.slice(
            dataheartRate.length - 30,
            dataheartRate.length
          );
          dataaccelerometerX = dataaccelerometerX.slice(
            dataheartRate.length - 30,
            dataaccelerometerX.length
          );
          dataaccelerometerY = dataaccelerometerY.slice(
            dataheartRate.length - 30,
            dataaccelerometerY.length
          );
          dataaccelerometerZ = dataaccelerometerZ.slice(
            dataheartRate.length - 30,
            dataaccelerometerZ.length
          );

          patient.heart_rate = dataheartRate;
          patient.accelerometerX = dataaccelerometerX;
          patient.accelerometerY = dataaccelerometerY;
          patient.accelerometerZ = dataaccelerometerZ;

          patient.save();

          console.log('Upated data for UID ' + patient.UID);
        }
      );
    });
  });
}

/** Utiliy functions */
router.get('/seed', function (req, res, next) {
  PatientSeed.seedPatients();
  res.send('<h1>Patient collection SEEDED!</h1>');
});

router.get('/drop', function (req, res, next) {
  Patient.collection.drop();
  res.send('<h1>Patient collection DROPPED!</h1>');
});

/** Require authentication for all the routes below */
router.all('*', ensureAuthenticated);

/** GET new patient form */

router.get('/new', function (req, res, next) {
  res.render('pages/patient/new');
});

router.get('/map', function (req, res, next) {
  res.render('pages/patient/map');
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
    UID,
  } = req.body;

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
    emergency,
    UID,
  });

  newPatient.save(function (err, newPatient) {
    if (err) return console.log(err);
    else {
      req.flash('success', 'Patient has been successfully created!');
      res.redirect('/patients/' + newPatient._id);
    }
  });
});
/** DELETE indiviudal patient */
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  Patient.deleteOne(
    {
      _id: id,
    },
    function (err, response) {
      if (err) return console.log(err);
      else {
        req.flash('success', 'Patient has successfully been deleted.');
        res.redirect('/patients');
      }
    }
  );
});

/** GET patients listing. */
router.get('/', function (req, res, next) {
  const queryObject = url.parse(req.url, true).query;
  var query = queryObject['query'];
  var filter = queryObject['filter'];

  if (filter && query) {
    Patient.find({})
      .where(filter, query)
      .exec(function (err, patients) {
        if (err) console.log(err);
        else {
          res.render('pages/patient/index', {
            patients: patients,
          });
        }
      });
  }
  Patient.find({})
    .where()
    .sort('UID')
    .exec(function (err, patients) {
      if (err) console.log(err);
      else {
        res.render('pages/patient/index', {
          patients: patients,
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
      Patient.find(
        {
          _id: {
            $ne: patient._id,
          },
        },
        '_id',
        { sort: { UID: 1 } },
        function (err, otherPatients) {
          otherPatients = otherPatients.slice(0, 2);
          res.render('pages/patient/show', {
            patient: patient,
            otherPatients: otherPatients,
          });
        }
      );
      // var data = new Data({UID:2});
      // Data.find({},function(err,data){
      //   res.send(data);
      // });
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
    blood_type: req.body.blood_type,
    UID: req.body.UID,
  };

  var id = req.params.id;

  Patient.findOneAndUpdate(
    {
      _id: id,
    },
    info,
    function (err, patient) {
      if (err) console.log(err);
      else {
        req.flash(
          'success',
          'Patient information has successfully been updated.'
        );
        res.redirect('/patients/' + patient._id);
      }
    }
  );
});

module.exports = router;
