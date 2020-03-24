/*
    DATABASE SCHEMA for Patients
*/

// TODO: Redis swap
// TESTING: Using mongoose db platform
const mongoose = require('mongoose');

// TODO: Redis swap
// Define user attributes
const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true,
        default: Date.now
    },
    bloodType:{
        type: String,
        required: true
    }
});

// TODO: Redis swap
// Export module name and schema
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
