/*
    DATABASE SCHEMA for Patient Health Data
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define user attributes
const dataSchema = new Schema({

    owner_id: Number,
    patient_id: Number,
    time: String,
    heartrate: mongoose.Decimal128,
    accelerometerX: mongoose.Decimal128,
    accelerometerY: mongoose.Decimal128,
    accelerometerZ: mongoose.Decimal128,
    activity_type: String
});

// Export module name and schema

module.exports = mongoose.model('Data', dataSchema);