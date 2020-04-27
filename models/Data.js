/*
    DATABASE SCHEMA for Patient Health Data
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define user attributes
const dataSchema = new Schema({

    owner_id: String,
    UID: Number,
    time: String,
    heartrate: String,
    accelerometerX: String,
    accelerometerY: String,
    accelerometerZ: String,
    activity_type: String
});

// Export module name and schema

module.exports = mongoose.model('Data', dataSchema);