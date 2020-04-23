
/*
    DATABASE SCHEMA for Patient Location
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define user attributes
const locationSchema = new Schema({
    UID:{
        type:Number,
        unique:true
    },
    owner_id: String,
    latitude : String,
    longitude: String,
});

// Export module name and schema

module.exports = mongoose.model('Location',locationSchema);