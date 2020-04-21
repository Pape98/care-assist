var express = require('express');
var router = express.Router();
var Patient = require('../models/Patient');
var User = require('../models/Patient');
var url = require('url');

/** API route to search specific patients */
router.get('/patients/search', function (req, res, next) {
    const queryObject = url.parse(req.url, true).query;
    var name = queryObject['q'];
    console.log(queryObject)
    Patient.find({
        first_name: name
    }, 'first_name last_name', function (err, patients) {
        var editedPatients = []
        patients.forEach(function (patient) {
            editedPatients.push({
                title: patient.last_name,
                description: patient.first_name,
                url: "/patients/" + patient._id
            });
        });
        var data = {
            results: editedPatients
        }
        res.json(data);
    });
});

/** API route to get specific data for all patients */
router.get('/patients', function (req, res, next) {
    Patient.find({}, function (err, patients) {
        if (err) console.log(err);
        else {
            res.json(patients)
        }
    });
});

module.exports = router;