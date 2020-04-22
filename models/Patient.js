
/*
    DATABASE SCHEMA for Patients
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define user attributes
const patientSchema = new Schema({

    first_name : {type:String , required:true},
    last_name: {type:String , required: true},
    birthday: Date,
    gender: String,
    physician: String,
    home_address: String,

    weight: String,
    height:  String,
    blood_type: String,
    latitude : String,
    longitude: String,
    heart_rate: [Number],
    isWithinFence: {type:Boolean,default:false},

    emergency:{
        full_name:String,
        relationship:String,
        home_address:String,
        phone_number:String,
        email:String
    }
});

// Export module name and schema

module.exports = mongoose.model('Patient',patientSchema);