
/*
    DATABASE SCHEMA for Patients
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define user attributes
const patientSchema = new Schema({
    firstName : {type:String , required:true},
    lastName: {type:String , required: true}
});

// Export module name and schema

module.exports = mongoose.model('Patient',patientSchema);