var express = require('express');
var router = express.Router();
var Patient = require('../models/Patient');
var User = require('../models/Patient');
var url = require('url');

/** GET specific patients */
router.get('/patients/search', function (req, res, next) {
    const queryObject = url.parse(req.url, true).query;
    var name = queryObject['q'];
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

/**  Get specific data for all patients */
router.get('/patients', function (req, res, next) {
    Patient.find({}, function (err, patients) {
        if (err) console.log(err);
        else {
            res.json(patients)
        }
    });
});

router.get('/patients/fence', function(req,res,next){
    const queryObject = url.parse(req.url, true).query;
    var id = queryObject['id'];
    var fence = queryObject['result'];

    Patient.findOneAndUpdate({_id: id},{isWithinFence:fence},function(err,patient){
        console.log(patient);
        patient.save();
    })
    res.json("Updated fence status for " + id)
})

module.exports = router;