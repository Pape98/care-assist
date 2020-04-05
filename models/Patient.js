
/*
    DATABASE SCHEMA for Patients
*/

var mongoose = require('mongoose');

// Define user attributes
const patientSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
})

// Export module name and schema
const Patient = mongoose.model('Patient',patientSchema);
mongoose.exports = Patient;