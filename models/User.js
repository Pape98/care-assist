/*
    DATABASE SCHEMA for Users (Caretakers)
*/

const mongoose = require('mongoose');

// Define user attributes
const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
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

// Export module name and schema
const User = mongoose.model('User', userSchema);
module.exports = User;


