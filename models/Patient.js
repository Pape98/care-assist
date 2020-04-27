
/*
    DATABASE SCHEMA for Patients
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define user attributes
const patientSchema = new Schema({
    UID:String,
    first_name : {type:String , required:true},
    last_name: {type:String , required: true},
    birthday: Date,
    gender: String,
    physician: String,
    home_address: String,
    image:String,

    weight: String,
    height:  String,
    blood_type: String,
    latitude : String,
    longitude: String,
    heart_rate: [Number],
    latitude: String,
    longitude: String,
    accelerometerX: [String],
    accelerometerY: [String],
    accelerometerZ: [String],

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