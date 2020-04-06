
/*
    DATABASE SCHEMA for Patients
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define user attributes
const patientSchema = new Schema({
    first_name : {type:String , required:true},
    lats_name: {type:String , required: true}
});

// Export module name and schema

module.exports = mongoose.model('Patient',patientSchema);