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

// module name, schema, and collection name
module.exports = mongoose.model('users', userSchema,'users');