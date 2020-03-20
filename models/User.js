// Database schema for users

// Encryption
//const bcrypt = require('bcrypt-nodejs');

/* 
    Redis modifications
*/
// var redis = require('redis');
// var schema = redis.Schema;
// var userSchema = new schema({

// TESTING: Using mongoose db platform
const mongoose = require('mongoose');

// Define user attributes
const userSchema = new mongoose.Schema({
    name:{
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
    }
    // ,
    // date:{
    //     type: Date,
    //     default: Date.now
    // },
    // admin:{
    //     type: Boolean,
    //     default: false,
    // }
});

// Export module name and schema
const User = mongoose.model('User', userSchema);
module.exports = User;

// /*  Password Hash Method
//     - Hash password using bcrypt encryption scheme
// */
// userSchema.methods.hashPassword = function (password) {
//     // Hash password using auto-generated salt (10 rounds)
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }

// /*  Password Compare Method
//     -Accepts presumed password and accompanying hash to check for equivalence
// */
// userSchema.methods.comparePassword = function (password, hash) {
//     return bcrypt.compareSync(password,hash);
// }
