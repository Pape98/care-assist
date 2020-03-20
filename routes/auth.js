var express = require('express');
var router = express.Router();
var User = require('../db/User')
//var moment = require('moment');

// Accepts passport functionality
module.exports = function (passport) {
    // Add user to db
    router.post('/signup', function(req, res) {
        var body = req.body,
            username = body.username,
            password = body.password;
        User.findOne({username:username}), function(err,doc) {
            if (err) {res.status(500).send('error occurred')}
            else {
                // If user already present
                if (doc) {
                    res.status(500).send('Username already exists')
                }
                // Otherwise add user to db
                else {
                    var record = new User ()
                    record.username = username;
                    record.password = record.hashPassword(password)
                    record.save(function(err,user){
                        if (err) {
                            res.status(500).send('database error')
                        }
                        else {
                            res.send(user)
                        }
                    })
                }
            }
        }
    });
    return router;
};
