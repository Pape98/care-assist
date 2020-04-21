var Patient = require('../models/Patient');

var patients = [{
    "first_name": "Julia",
    "last_name": "Mckay",
    "birthday": "2018-11-29T04:26:34 +06:00",
    "gender": "Male",
    "physician": "Perkins Oneill",
    "home_address": "644 Hendrix Street, Frierson, Pennsylvania, 578",
    "weight": 76,
    "height": 154,
    "blood_type": "B+",
    "latitude": 30.622415,
    "longitude": -96.338917,
    "heart_rate": [
        74,
        78,
        62,
        81,
        61,
        80,
        67,
        63,
        71,
        64,
        77,
        72,
        70,
        75,
        80,
        69,
        81,
        65,
        61,
        78,
        63,
        72,
        67,
        69,
        70,
        70,
        73,
        72,
        79,
        63
    ],
    "emergency": {
        "full_name": "Chase Delacruz",
        "relationship": "Son",
        "home_address": "473 Monument Walk, Rosewood, Vermont, 1850",
        "phone_number": "+1 (919) 415-2175",
        "email": "chasedelacruz@uplinx.com"
    }
}];

function seedPatients(){
    for(patient of patients){
       var newPatient = new Patient(patient);
       newPatient.save(); 
    }
}

exports.seedPatients = seedPatients;