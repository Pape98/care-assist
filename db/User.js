// Database model for users

/* 
    Redis modifications
*/
// var redis = require('redis');
// var schema = redis.Schema;
// var userSchema = new schema({
    
// })

// TESTING: Using mongoose db platform
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;
// Define user attributes
var userSchema = new schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    // admin:{
    //     type:Boolean,
    //     required:false,
    // }
})

/*  Password Hash Method
    - Hash password using bcrypt encryption scheme
*/
userSchema.methods.hashPassword = function (password) {
    // Hash password using auto-generated salt (10 rounds)
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

/*  Password Compare Method
    -Accepts presumed password and accompanying hash to check for equivalence
*/
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password,hash);
}

// module name, schema, and collection name
module.exports = mongoose.model('users', userSchema,'users');