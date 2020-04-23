var Patient = require('../models/Patient');

var patients = [{
    "owner_id": 1,
    "first_name": "Esperanza",
    "last_name": "Mendoza",
    "birthday": "2020-02-04T12:23:53",
    "gender": "Male",
    "physician": "Jacobs Wise",
    "home_address": "678 Miller Place, Stockwell, Arizona, 3155",
    "weight": 66,
    "height": 197,
    "blood_type": "AB+",
    "isWithinFence": false,
    "heart_rate": [66, 62, 55, 64, 70, 63, 62, 66, 68, 57, 64, 59, 75, 67, 68, 74, 55, 70, 66, 57, 73, 67, 64, 59, 56, 72, 75, 57, 60, 57],
    "emergency": {
        "full_name": "Krystal Velazquez",
        "relationship": "Uncle",
        "home_address": "213 Florence Avenue, Spelter, Alaska, 9916",
        "phone_number": "+1 (963) 410-3563",
        "email": "krystalvelazquez@sportan.com"
    }
}, {
    "owner_id": 2,
    "first_name": "Candace",
    "last_name": "Spence",
    "birthday": "2015-06-16T12:28:44",
    "gender": "Male",
    "physician": "May Stephens",
    "home_address": "353 Fairview Place, Topaz, Wyoming, 742",
    "weight": 83,
    "height": 204,
    "blood_type": "AB+",
    "isWithinFence": false,
    "heart_rate": [65, 73, 62, 69, 67, 71, 75, 69, 56, 58, 68, 59, 66, 68, 65, 70, 74, 62, 60, 71, 65, 65, 68, 62, 74, 64, 62, 72, 65, 63],
    "emergency": {
        "full_name": "Gwendolyn Dudley",
        "relationship": "Daughter",
        "home_address": "283 Hewes Street, Calverton, Maryland, 2933",
        "phone_number": "+1 (973) 457-3477",
        "email": "gwendolyndudley@sportan.com"
    }
}, {
    "owner_id": 3,
    "first_name": "Cardenas",
    "last_name": "Hancock",
    "birthday": "2015-04-01T06:19:51",
    "gender": "Female",
    "physician": "Salazar Stanton",
    "home_address": "952 Calder Place, Tecolotito, Hawaii, 4167",
    "weight": 87,
    "height": 165,
    "blood_type": "B",
    "latitude": 30.62254,
    "heart_rate": [70, 63, 68, 73, 73, 66, 57, 62, 71, 60, 62, 61, 68, 56, 55, 64, 73, 60, 70, 73, 71, 67, 64, 64, 57, 56, 68, 72, 72, 59],
    "emergency": {
        "full_name": "Sears Holcomb",
        "relationship": "Son",
        "home_address": "605 Tillary Street, Sterling, Indiana, 2486",
        "phone_number": "+1 (979) 522-3102",
        "email": "searsholcomb@sportan.com"
    }
}, {
    "owner_id": 4,
    "first_name": "Holmes",
    "last_name": "Yates",
    "birthday": "2017-01-09T09:06:28",
    "gender": "Male",
    "physician": "Letitia Trevino",
    "home_address": "562 Hope Street, Malo, Michigan, 3608",
    "weight": 60,
    "height": 164,
    "blood_type": "A",
    "isWithinFence": false,
    "heart_rate": [65, 75, 68, 72, 65, 61, 58, 57, 65, 56, 55, 55, 64, 70, 72, 67, 65, 61, 70, 55, 63, 56, 55, 59, 74, 57, 73, 74, 68, 60],
    "emergency": {
        "full_name": "Lewis Bird",
        "relationship": "Daughter",
        "home_address": "668 Irvington Place, Edenburg, Rhode Island, 2829",
        "phone_number": "+1 (967) 588-3134",
        "email": "lewisbird@sportan.com"
    }
}, {
    "owner_id": 5,
    "first_name": "Tammy",
    "last_name": "Reilly",
    "birthday": "2014-02-18T11:30:39",
    "gender": "Male",
    "physician": "Ericka Price",
    "home_address": "554 Elm Avenue, Wikieup, Virgin Islands, 3616",
    "weight": 93,
    "height": 198,
    "blood_type": "A-",
    "isWithinFence": false,
    "heart_rate": [62, 68, 71, 66, 66, 73, 59, 61, 57, 69, 72, 58, 74, 58, 71, 75, 65, 71, 64, 59, 62, 67, 60, 58, 75, 57, 66, 57, 72, 65],
    "emergency": {
        "full_name": "Bryant Hebert",
        "relationship": "Aunt",
        "home_address": "584 Poplar Avenue, Jennings, Connecticut, 2470",
        "phone_number": "+1 (877) 524-2791",
        "email": "bryanthebert@sportan.com"
    }
}];

function seedPatients() {
    for (patient of patients) {
        var newPatient = new Patient(patient);
        newPatient.save();
    }
}

exports.seedPatients = seedPatients;