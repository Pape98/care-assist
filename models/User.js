/*
    DATABASE SCHEMA for Users (Caretakers)
*/

// TODO: Redis swap
// TESTING: Using mongoose db platform
const mongoose = require('mongoose');

// TODO: Redis swap
// Define user attributes
const userSchema = new mongoose.Schema({
    fName:{
        type: String,
        required: true
    },
    lName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    admin:{
        type: Boolean,
        default: false,
    }
});

// TODO: Redis swap
// Export module name and schema
const User = mongoose.model('User', userSchema);
module.exports = User;


